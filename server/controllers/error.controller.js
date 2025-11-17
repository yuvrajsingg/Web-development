// server/controllers/error.controller.js
// Simple error handler to extract mongoose errors
const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Duplicate key error'
        break
      default:
        message = 'Something went wrong'
    }
  } else {
    if (err.message) message = err.message
    else message = String(err)
  }
  return message
}

export default { getErrorMessage }
