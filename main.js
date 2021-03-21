const button = document.querySelector('#btn')
const imgContainer = document.querySelector('#image-container')

async function getQrcode(value) {
  const BASE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${value}`
  const res = await fetch(BASE_URL)
  return res
}

button.addEventListener('click', async function() {
  const input = document.querySelector('#input')
  
  if(input.value.trim() !== '') {
    const data = await getQrcode(input.value)
    
    if(data.status == 200) {
      imgContainer.innerHTML = 
        `
          <img src="${data.url}" id="image-qr" />
          <p class="info-ok">QRcode gerado!</p>
          <p>${input.value}</p>
        `
      input.value = ''
      input.focus()
    } else {
      // caso get não retorne 200
      imgContainer = 
        `
          <p class="info-no">QRcode não gerado!</p>
          <p>Não foi possível gerar o QRcode, verifique sua conexão e tente novamente.</p>
        `
      input.value = ''
      input.focus()
    }
    
  } else{
    alert('Não é possível gerar Qrcode com campo vazio!\r\nTente novamente!')
    input.focus()
  }

})


