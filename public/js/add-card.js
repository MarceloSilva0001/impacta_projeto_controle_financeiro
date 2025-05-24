document.getElementById('card-number').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.value = value;
    document.getElementById('preview-number').textContent = value || '•••• •••• •••• ••••';
  });
  
  document.getElementById('card-expiry').addEventListener('input', function () {
    let value = this.value.replace(/\D/g, '').substring(0, 4);
    if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{2})/, '$1/$2');
    }
    this.value = value;
    document.getElementById('preview-expiry').textContent = value || '••/••';
  });
  
  document.getElementById('card-name').addEventListener('input', function () {
    document.getElementById('preview-name').textContent = this.value.toUpperCase() || 'NOME DO TITULAR';
  });
  