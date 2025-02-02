document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("output");
    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let resultDisplayed = false;
    
    document.querySelector(".buttons").addEventListener("click", function (event) {
        const value = event.target.dataset.value;
        if (!value) return;
        
        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        } else if (["+", "-", "*", "/"].includes(value)) {
            handleOperator(value);
        } else if (value === "C") {
            clearDisplay();
        } else if (value === "erase") {
            erase();
        } else if (value === "=") {
            calculate();
        }
    });
    
    function handleNumber(number) {
        if (resultDisplayed) { 
            currentInput = "";
            resultDisplayed = false;
        }

        if (currentInput.includes(".") && number === ".") return;
        currentInput += number;
        updateDisplay(currentInput);
    }
    
    function handleOperator(op) {
        if (currentInput === "" && firstOperand === "") return;
        
        if (currentInput === "" && firstOperand !== "") { 
            operator = op;
            return;
        }

        if (firstOperand !== "" && currentInput !== "") {
            calculate();
        }

        firstOperand = currentInput;
        operator = op;
        currentInput = "";
    }
    
    function calculate() {
        if (firstOperand === "" || currentInput === "") return;
        let result;
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(currentInput);
        
        switch (operator) {
            case "+": result = num1 + num2; break;
            case "-": result = num1 - num2; break;
            case "*": result = num1 * num2; break;
            case "/": 
                if (num2 === 0) {
                    updateDisplay("Error");
                    setTimeout(clearDisplay, 1500); 
                    return;
                }
                result = num1 / num2; 
                break;
        }
        
        updateDisplay(result);
        firstOperand = result.toString();
        currentInput = "";
        resultDisplayed = true;
    }
    
    function clearDisplay() {
        firstOperand = "";
        currentInput = "";
        operator = "";
        updateDisplay("0");
    }
    
    function erase() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    }
    
    function updateDisplay(value) {
        display.textContent = value;
    }
});
