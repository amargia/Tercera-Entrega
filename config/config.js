const config = {
    mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/test",

    firebase: {
        type: "service_account",
        project_id: "backend-segunda-entrega-3bd2b",
        private_key_id: "20613a2d51ca726fababf79343f361d87f764ff5",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCvqZE7bANocgEK\nAyJhBxEN27m3cXUFe1qP/zYVmfYiQ246zd+uqV0tqrIw/VCB69AzvN9jUZi6IXbu\nwomo3Nv51eWl2sF4C8wsPkdsYEEeeHKq73LdOEI7nC90cQA2B46JPOO7aub93KmW\noJij6DuLNZZrLUsjJT6l3w9Obn/9dqHFELHFG/qqtkjCRkNaXt+e6dGWNRYw0uhj\nShd0s6oWd2r+pWE9E9bOnRxukeh1Dr914So6M4H9/vOjr/NTqY3kCcqPgMoaTe/x\nDk+L50qrrCBWLzX8NLw4CASTY88yKGtip73xsjW1M12J0SOEpupBpS457UI4kode\naWESW96FAgMBAAECgf9TxeGTnCwoePAyzrFA8191YDWjXPQx6rvSS9q1NQ0yrAS7\nR13BvTpewVgWtsvOl60ec8osZbRllNrWDnCZw4Ho/oYUxxKMDthu5AjDJcc7kXZ3\n0R9Q+Cjt2K02sHTMOERlXtwvHvUPQpZ2Kn9oecN6wlbycUEaG36fpIfa49YhLzyl\ndi8nphXpsCn1obe/S456n1+eyGeyS9M9fzau4GSPkMzRkJxpWIcdZWXr7J2Faibs\n/CdtRXzS/yTs6QfMqSDfRsrWbBFEhz84O1BEBai2YsSfg0ipTG+XBElN6tHGxsHi\nnxEFVrdSPRu05Ty/6g+/NoA7lSqeXkqLzJnqEwkCgYEA3RjCnAj2fP+6/uO4k/BU\neAO497VUS2HMm9T+TAJDHfxrzVNf6Qb5cR0X79/Rj6WuCaNlszipqoABYGi0VJUh\nbp6gK28+m/lcSpH/WKqhhz70xsFkQrbLERyDARZmqBWTR1njZTMiWWtePqIEXCp9\nB1PztOAKJPaNLq384Uxc1V0CgYEAy2SoK1Se51rdAlky2yaIc0klmbVAZ5sExQH7\nhERDR0nx4zeE/9dtQwH3V/5YcrMP1gZmAJpZjiWUzHAPKbYTv4zkLk2pE9cGxkIR\nN17XyClP0joZsF8oa9Rtj5qLUppq4zzLvvsiPR3DlN2z6TsPYlQMKuF4NYPA87q9\nKgdPs0kCgYB+QRVgZP3cg2wVAZT1ZdfWcMm/KhzorwBYPFi6rtAE34/vwByUxRbM\nMQDqSbUxgjrP5i69GS5J3q7qjt/rLP3aXVq5ct0d1FePfa+Cwm1a/ehpVyYZsqhj\nLRTiGhilAy0HIZ1ovLpwtY8r1PkIaHrdJGOWdhlU4jXc4h31ydV5QQKBgGpcDbDz\nBFGZa19SA80kHlCjHJ1/cdl78AeRnNQy2jfKTEp0ewFKxyE2QwDpyZjZWFukZuzD\nyjcSIfiyVMuMIlGVvLEV/WeZlzpPzC73UsGiENKvfUWEzV9t64kf2OFuTJzd6vHI\n48Ov79nGAdHiB450wxQdab4aUulhapAy2JO5AoGAXSxe8YJ37lrOH/AKOduxD0Yn\nMba+XHkvNEreQw8sWNY2XHnRhMdzD5ywkQ5RWwQLlGMc8AjSP72okA+bj0jLqspK\nGv7m60syfjKCxIWnmfQf78/xQjAX1ZL3EJcP1t7h6y0SSkltkN2wt3Ac5KNk1rZK\nz7KrYLiQtT2+LPL18P0=\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-xxnh8@backend-segunda-entrega-3bd2b.iam.gserviceaccount.com",
        client_id: "117560665299873531002",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxnh8%40backend-segunda-entrega-3bd2b.iam.gserviceaccount.com"
      },
      firebaseUrl: "https://url-example.firebaseio.com"
}

export default config;