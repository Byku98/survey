package com.byczek.survey.tools;
import java.util.Base64;


public class base64Decoder {

    Base64.Decoder decoder;


    public base64Decoder(Base64.Decoder decoder) {
        this.decoder = Base64.getUrlDecoder();
    }

    public Base64.Decoder getDecoder() {
        return decoder;
    }

    public void setDecoder(Base64.Decoder decoder) {
        this.decoder = decoder;
    }

    public String decode(String encryptedMessage){

        String decodedMessage = new String(decoder.decode(encryptedMessage));

        return decodedMessage;

    }

}
