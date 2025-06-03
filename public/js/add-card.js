    async function assinarPlano() {
              // Validação básica dos campos
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardCvc = document.getElementById('card-cvc').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardName = document.getElementById('card-name').value.trim();

        // Obter userId do localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          return window.location.href = '/login';
        }
        
        try {
          
          // Enviar dados de pagamento
          const response = await fetch('/api/payment/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              cardData: {
                number: cardNumber,
                cvc: cardCvc,
                expiry: cardExpiry,
                name: cardName
              }
            })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Erro ao processar pagamento');
          }
          
          // Atualizar localStorage com novo plano
          localStorage.setItem('userSubscriptionType', JSON.stringify({
            type: data.subscriptionType || 'premium' // Assume premium se não especificado
          }));
          
          // Redirecionar para página de agradecimento
          window.location.href = 'thank-you.html';
          
        } catch (error) {
          console.error('Erro:', error);
          alert(error.message || 'Erro ao processar pagamento. Tente novamente.');
        } finally {

        // Verificar assinatura atual
        try {
          const subscription = localStorage.getItem('userSubscriptionType');
          
          // Se não existir no localStorage, buscar do servidor
          if (!subscription) {
            const response = await fetch(`/api/users/${userId}/subscription`);
            
            if (!response.ok) {
              throw new Error('Erro ao buscar assinatura');
            }
            
            const data = await response.json();
            localStorage.setItem('userSubscriptionType', JSON.stringify({
              type: data.subscriptionType || 'free'
            }));
          }
          
          // Opcional: Verificar se já é premium e redirecionar
          const currentSubscription = JSON.parse(localStorage.getItem('userSubscriptionType') || '{"type":"free"}');
          if (currentSubscription.type === 'premium') {
            // window.location.href = '/premium-dashboard'; // Ou mostrar mensagem
          }
          
        } catch (error) {
          console.error('Erro ao verificar assinatura:', error);
          // Define como free por padrão em caso de erro
          localStorage.setItem('userSubscriptionType', JSON.stringify({
            type: 'free'
          }));
        }
    }
  }