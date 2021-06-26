from Crypto.PublicKey import RSA
key = RSA.generate(2048)
publicKey = key.publickey().exportKey("PEM")
privateKey = key.exportKey("PEM")

x = publicKey.encr
