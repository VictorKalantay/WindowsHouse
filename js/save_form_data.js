class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  put(endpoint, body) {
    return this._send("put", endpoint, body);
  }

  post(endpoint, body) {
    return this._send("post", endpoint, body);
  }

  delete(endpoint, body) {
    return this._send("delete", endpoint, body);
  }

  _send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then(response => response.json());
  }
}


const API = new FetchWrapper('https://62fe1cf5a85c52ee48300431.mockapi.io/')
const messageField = document.querySelector('.message-popup')

const hideMessage = () => {
  messageField.classList.remove('active')
}
const showMessage = (text) => {
  messageField.textContent = `${text}`
  messageField.classList.add('active')
  setTimeout(hideMessage, 3000)
}

let taboo = false
const saveFormData = () => {
  let forms = document.querySelectorAll('form')
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const messages = {
          affirmative: `Спасибо, ${formData.get('name')}. Ваш запрос отправлен. Наш менеджер свяжется в самое ближайшее время!`,
          negative: `${formData.get('name')}, Ваш запрос в обработке. Ожидайте звонка нашего менеджера`,
          enterName: 'Пожалуйста, введите имя, чтобы мы знали как к Вам обращаться',
          enterTel: `${formData.get('name')}, пожалуйста, введите номер телефона или e-mail, чтобы мы могли с Вами связаться`,
          enterContract: 'Пожалуйстаб введите номер договора, это необходимо для вверификации Вас, как нашего клиента',
          incorrectTel: 'Введенный номер некорректен',
          checkbox: 'Вы не согласились на обработку персональных данных',
        }
        let objectWithData = {
          name: formData.get('name'),
          tel: formData.get('tel'),
          mail: formData.get('email'),
          contract: formData.get('contract'),
          review: formData.get('review'),
        }
        const postData = () => {
          API.post('users', {
            name: formData.get('name'),
            tel: formData.get('tel'),
            mail: formData.get('email'),
            contract: formData.get('contract'),
            review: formData.get('review'),
            date: new Date()
          }).then(data => {
            showMessage(messages.affirmative)
            taboo = true
            console.log(data)
          })
        }
        const ifCheckBoxCheckedPostData = () => {
          if (formData.get('checkbox')) {
            if (!taboo) {
              postData()
            } else {
              showMessage(messages.negative)
            }
          } else {
            showMessage(messages.checkbox)
          }
        }
        if (!objectWithData.name?.length > 0) {
          showMessage(messages.enterName)
        } else if (!objectWithData.tel?.length > 0 && !objectWithData.mail?.length > 0) {
          showMessage(messages.enterTel)
        } else if (objectWithData.tel?.length > 0) {
          if (objectWithData.tel.startsWith('380') || objectWithData.tel.startsWith('0')) {
            ifCheckBoxCheckedPostData()
          } else {
            showMessage(messages.incorrectTel)
          }
        } else {
          ifCheckBoxCheckedPostData()
        }
      }
    )
  })
}
export default saveFormData
