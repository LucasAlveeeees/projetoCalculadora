
//Seleção dos elementos atravez do DOM.
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button');


// logica da aplicação
class calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = ''

    }
    // add digit to calculator screen
    addDigit(digit){
        //check if current operation already has a dot
        if(digit == '.' && this.currentOperationText.innerText.includes('.')){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()

    }

    // Process all calculator operations
    processOperation(operation){
        //check if current value is empty
        if(this.currentOperationText.innerText === '' && operation !== 'C'){
            // Change operation
            if(this.previousOperationText.innerText !== ''){
                this.changeOperation(operation);
            }
            return;
        }
        
        // Get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(' ')[0];
        const current  = +this.currentOperationText.innerText;


        switch(operation){
            case '+':
                operationValue = previous+current
                this.updateScreen(operationValue,operation,current,previous);

                break;
                case '-':
                operationValue = previous-current
                this.updateScreen(operationValue,operation,current,previous);

                break;
                case '/':
                operationValue = previous/current
                this.updateScreen(operationValue,operation,current,previous);

                break;
                case '*':
                operationValue = previous*current
                this.updateScreen(operationValue,operation,current,previous);

                break;
                case 'DEL':
                this.processDelOperator(operationValue,operation,current,previous);

                break;
                case 'CE':
                this.processClearOperation(operationValue,operation,current,previous);

                break;
                case 'C':
                this.processClearAllOperation(operationValue,operation,current,previous);

                break;
                case '=':
                this.processEqualOperator();

                break;
                
                default:
                    return;
        }

    }


    // change values of the calculator screen

    updateScreen(operationValue = null, 
        operation = null, 
        current = null, 
        previous = null ){
            console.log(operationValue,operation,current,previous);
        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        }else{
            //check if value is zero, if is just add current value
            if(previous === 0){
                operationValue = current;
            }
            // Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = '';
        }
    }
    // Chance math operation

    changeOperation(operation){
        const mathOperations = ['*','/','+','-']
        if(!mathOperations.includes(operation)){
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);

    }
    // Clear current operation
    processClearOperation(){
        this.currentOperationText.innerText = ""
    }

    // Clear All operation

    processClearAllOperation(){
        this.currentOperationText.innerText = '';
        this.previousOperationText.innerText = '';
    }
    //Process an operation
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation);
    }

}
const calc = new calculator(previousOperationText,currentOperationText);




// eventos
buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const value = e.target.innerText;
        
        if(+value >= 0 || value === '.'){
            calc.addDigit(value)
        
        } else{
            calc.processOperation(value);
            

        }
    })


});