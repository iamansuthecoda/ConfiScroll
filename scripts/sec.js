class EncryptDecrypt{
    constructor() {
        if (arguments[0])
            this.KEY = arguments[0];
        else {
            const CHARSET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '$', '?'];
            let GEN_KEY = "";
            for (let i = 0; i < 16; i++)
                GEN_KEY += CHARSET[Math.floor(Math.random() * (CHARSET.length - 1))];
            this.KEY = GEN_KEY;
        }
        this.Separator = ".";
    }
    changeKEY(KEY) {
        this.KEY = String(KEY);
    }
    changeSeparator(Separator) {
        this.Separator = String(Separator);
    }

    #isEven(num) {
        num = parseInt(num);
        if (num % 2 == 1)
            return false;
        else
            return true;
    }
    #generateBinary(dec){
        dec = String(dec) ?? "";
        let result = "";
        for (let i=0; i<dec.length; i++){
            result += (parseInt(dec.charAt(i)) >>> 0).toString(2);
        }
        result = String(result);
        return result;
    }
    #generateNumber(str){
        str = String(str) ?? "";
        let result = "";
        for (let i=0; i<str.length; i++){
            result += str.charCodeAt(i);
        }
        result = String(result);
        return result;
    }
    
    encrypt(plTxt){
        plTxt = String(plTxt) ?? "";
        let key = String(this.#generateBinary(this.#generateNumber(String(this.KEY))));
        let forward;
        let forbackDec = 0;
        let shift = 0;
        let result = "";
        for (let i=0; i<key.length; i++){
            let bool = Boolean(parseInt(key.charAt(i)));
            if (bool)
                shift++;
            else
                forbackDec++;
        }
        forward = this.#isEven(forbackDec);
        for (let i=0; i<plTxt.length; i++){
            if (forward){
                if (result != "") {
                    result += this.Separator + String(plTxt.charCodeAt(i) + shift);
                } else {
                    result += String(plTxt.charCodeAt(i) + shift);
                }
            } else {
                if (result != "") {
                    result += String(this.Separator + (plTxt.charCodeAt(i) - shift));
                } else {
                    result += String(plTxt.charCodeAt(i) - shift);
                }
            }
        }
        result = String(result);
        return result;
    }
    
    decrypt(ciTxt){
        ciTxt = String(ciTxt) ?? "";
        let key = String(this.#generateBinary(this.#generateNumber(String(this.KEY))));
        let forward;
        let forbackDec = 0;
        let shift = 0;
        let result = "";
        let ciArr = ciTxt.split(this.Separator);
        for (let i=0; i<key.length; i++){
            let bool = Boolean(parseInt(key.charAt(i)));
            if (bool)
                shift++;
            else
                forbackDec++;
        }
        forward = !(this.#isEven(forbackDec));
        ciArr.forEach((ciEle) => {
            if (forward){
                result += String.fromCharCode(parseInt(ciEle) + shift);
            } else {
                result += String.fromCharCode(parseInt(ciEle) - shift);
            }
        });
        result = String(result);
        return result;
    }
}