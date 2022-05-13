

// this are the two disks
let outerDisk = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let innerDisk = "lnougzcqmihfvxkjwbarydepts"
let encryptedMessage = ''
let decryptedMessage = ''

// transaltes or "rotates" the outer disks to map with the inner one 
function map(keyLetter, outerDiskKey) {
    let counterForMap = 0
    let checkOuter = false
    let checkInner = false
    decryptionMap = new Map()
    encryptionMap = new Map()
        
    while (true) {
            
            if (outerDisk[0] !== outerDiskKey && checkOuter ===false) {
                outerDisk = outerDisk.concat(outerDisk[0])
                outerDisk = outerDisk.substring(1)
            }
            if(outerDisk[0]=== outerDiskKey) checkOuter = true
            if (innerDisk[0]!==keyLetter && checkInner === false) {
                innerDisk = innerDisk.concat(innerDisk[0])
                innerDisk = innerDisk.substring(1)
                }
            if(innerDisk[0] === keyLetter) checkInner = true
            if (checkOuter === true && checkInner === true){
                decryptionMap.set(innerDisk[counterForMap],outerDisk[counterForMap])
                encryptionMap.set(outerDisk[counterForMap],innerDisk[counterForMap])
                counterForMap++
                if(counterForMap === 26){
                    decryptionMap.set(' ',' ')
                    encryptionMap.set(' ',' ')
                    break
                   
                }               
            }

            
        }
        // for access time convinience
        return decryptionMap,encryptionMap 
    }
    
// used in the encryption phase to change the key - letter map randomly returns random int
function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
      


//encypts the message using the keyletter and returns String
function encrypt(message, keyLetter){
    
    message = message.toUpperCase()
   let initialChar =  outerDisk.charAt(getRandomInt(outerDisk.length))

    encryptedMessage += initialChar.toUpperCase() 
    map(keyLetter,initialChar)
    // for simplicity the shift in key - letter map happens in range of 1 - 10
    shift = getRandomInt(10)
    counter = 0
    while (true) {
        
       encryptedMessage += encryptionMap.get(message[counter])
       counter++
       shift --
       if (shift ==0) {
        Char = outerDisk.charAt(getRandomInt(outerDisk.length))
        encryptedMessage += Char.toUpperCase() 
        shift = getRandomInt(10)
        map(keyLetter,Char)           
       }
   
       if (counter == (message.length)) {
           break
       }

    }

    
    
    return encryptedMessage
}

// accepts the encrypted message by the above functions and returns the original message 
function decrypt(encryptedMessage, keyLetter) {
    counter = -1
    while (counter <= encryptedMessage.length-2) {
        
        counter ++
        if (encryptedMessage[counter] === encryptedMessage[counter].toUpperCase() && encryptedMessage[counter] !== ' ') {
            map(keyLetter, encryptedMessage[counter])
            continue
        }
        else{
            decryptedMessage += decryptionMap.get(encryptedMessage[counter])
            
        }
        
    }
    return decryptedMessage
}
mes = ''
 


document.querySelector('.encrypt').addEventListener('click', function(){
    // the secrete key to exchange between parties
    const keyLetter = document.querySelector('.keyLetter').value
    
    //the messages
    const message = document.querySelector('.encryptInput').value
    

 
    if (mes === '' && keyLetter.length ===1) {
        mes = encrypt(message,keyLetter)
        
        document.querySelector('.encryptedMessage').textContent = mes
    }
   
})

document.querySelector('.decrypt').addEventListener('click', function(){
    // the secrete key to exchange between parties
    const keyLetter = document.querySelector('.keyLetter').value
    
    //the message
    const message = document.querySelector('.encryptInput').value
    

    if (mes === '' && keyLetter.length ===1) {
        mes = decrypt(message,keyLetter)
        
        document.querySelector('.encryptedMessage').textContent = mes
    }
       
})

