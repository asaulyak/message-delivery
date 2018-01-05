module.exports = {
  rabbitMQ: {
    connection: 'amqp://localhost',
    queue: 'message_queue'
  },
  transport: {
    email: {
      login: 'text.alteryx@gmail.com',
      service: 'gmail',
      replyTo: 'jenya.asaulyak@gmail.com',
      clientId: '267518251974-0q708o681e5vv12puhcf7jcl2k112ci6.apps.googleusercontent.com',
      clientSecret: 'jIWu2xjCkiw_lH-oRZA_2ji_',
      refreshToken: '1/NHEQyFc36R8CEHRaiR5mVOftZulwhGFuaED8xEOdyQc',
      accessToken: 'ya29.Gls5BRcWxtW3g5YlZiF657BPymUJY2FEQf_spRfwnr9Y-2LWXV_8Ij1l51i4ZZjarRGLL3dBYCrF98JLy0DWBvnkihbsfBDLPDaSWM9VmvSiEUgmL8esGFMIxnqt'
    },
    defaultTransport: 'email'
  }
};