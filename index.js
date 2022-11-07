// HTML elements
const resultBox = document.getElementById("result-box");
resultBox.textContent = 0;

const stackBox = document.getElementById("stack-box");
const buttons = document.querySelectorAll("button");
const factorizationBox = document.getElementById("factorization-box");

let stack = [];

// Functions
function printStack() {
    let stackElements = "";

    stack.forEach(element => {
        stackElements += element + " ";
    });

    stackBox.textContent = stackElements;
}

function clearStack() {
    while (stack.length > 0) {
        stack.pop();
    }
}

function GCD(x, y) {
    let result = Math.min(x, y);

    while (result > 0) {
        if (x % result == 0 && y % result == 0) {
            break;
        }

        result--;
    }

    return result;
}

function Prime(x) {
    const xText = x;

    let prime = {};

    let i = 2;
    while (x > 1) {
        if (x % i == 0) {
            if (i in prime) {
                prime[i]++;

            } else {
                prime[i] = 1;
            }

            x /= i;

        } else {
            i++;
        }
    }

    let primeText = ""; 
    
    Object.entries(prime).forEach(([k, v]) => {
        if (v > 1) {
            if (primeText.length > 0) {
                primeText += " * " + k + "^" + v;
            
            } else {
                primeText += k + "^" + v;
            } 

        } else {
            if (primeText.length > 0) {
                primeText += " * " + k;

            } else {
                primeText += k;
            }
        }
    });

    return "$$ " + xText + "=" + primeText + " $$";
}

function isPrime(n)
{
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
            return false;
        }
    }

    return true;
}

function Goldbach(x) {
    prime = [];

    for (let i = 0; i < x; i++) {
        if (isPrime(i)) {
            prime.push(i);
        }
    }

    for (let i = 0; prime[i] <= x / 2; i++) {
        let diff = x - prime[i];
 
        if (prime.includes(diff)) {
            return [prime[i], diff];
        }
    }
}

printStack();

// Events
buttons.forEach(button => button.addEventListener("click", () => {
    if (button.id == "btn-clear") {
        clearStack();

        resultBox.textContent = "0";
        factorizationBox.textContent = "";

    } else if (button.id == "btn-swap") {
        if (stack.length > 1) {
            let buff = stack[stack.length - 1];
            stack[stack.length - 1] = stack[stack.length - 2];
            stack[stack.length - 2] = buff;
        }

    } else if (button.id == "btn-backspace") {
        resultBox.textContent = resultBox.textContent.slice(0, -1);

        if (resultBox.textContent.length == 0) {
            resultBox.textContent = 0;
        }

    } else if (button.id == "btn-enter") {
        if (parseInt(resultBox.textContent) > Number.MAX_SAFE_INTEGER) {
            alert("Liczba jest zbyt duża!");
        } else {
            stack.push(parseInt(resultBox.textContent));
        }

        resultBox.textContent = 0;

    } else if (button.className.includes("btn-operator")) {
        if (stack.length > 0) {
            switch (button.textContent) {
                case "PRIME": 
                    if (stack[stack.length - 1] > 1) {
                        const p = Prime(stack[stack.length - 1]);
                    
                        factorizationBox.textContent = p;

                        MathJax.typeset();

                    } else {
                        alert("Liczba musi być większa od 1");
                    }
                    
                    break;

                case "SUM":
                    if (stack[stack.length - 1] > 8) {
                        const numbers = Goldbach(stack[stack.length - 1]);

                        factorizationBox.textContent = "$$ " + stack[stack.length - 1] + "=" + numbers[0] + "+" + numbers[1] + " $$";

                        MathJax.typeset();

                    } else {
                        alert("Liczba musi być większa od 8");
                    }
                    
                    break;

                default:
                    break;
            }
        } 
        
        if (stack.length > 1) {
            switch (button.textContent) {
                case "+":
                    if ((stack[stack.length - 1] + stack[stack.length - 2]) > Number.MAX_SAFE_INTEGER) {
                        alert("Liczba jest zbyt duża!");
                    } else {
                        const result = stack[stack.length - 1] + stack[stack.length - 2]; 

                        stack.pop();
                        stack.pop();

                        stack.push(result);
                    }
                    
                    break;
    
                case "-":
                    result = Math.abs(stack[stack.length - 2] - stack[stack.length - 1]);

                    stack.pop();
                    stack.pop();

                    stack.push(result);

                    break;  
    
                case "*":
                    if ((stack[stack.length - 1] * stack[stack.length - 2]) > Number.MAX_SAFE_INTEGER) {
                        alert("Liczba jest zbyt duża!");
                    } else {
                        const result = stack[stack.length - 1] * stack[stack.length - 2];
                        
                        stack.pop();
                        stack.pop();

                        stack.push(result);
                    }
                    
                    break;
    
                case "/":
                    if (stack[stack.length - 1] != 0) {
                        const result = Math.floor(stack[stack.length - 2] / stack[stack.length - 1]);

                        stack.pop();
                        stack.pop();

                        stack.push(result);

                    } else {
                        alert("Nie wolno dzielić przez 0");
                    }
                    
                    break; 
    
                case "%":
                    const result = stack[stack.length - 2] % stack[stack.length - 1];

                    stack.pop();
                    stack.pop();

                    stack.push(result);
                    break;  
    
                case "^":
                    if (Math.pow(stack[stack.length - 2], stack[stack.length - 1]) > Number.MAX_SAFE_INTEGER) {
                        alert("Liczba jest zbyt duża!");
                    } else {
                        const result = Math.pow(stack[stack.length - 2], stack[stack.length - 1]);

                        stack.pop();
                        stack.pop();

                        stack.push(result);
                    }
                    
                    break; 
                    
                case "GCD":
                    result = GCD(stack[stack.length - 2], stack[stack.length - 1]);

                    stack.pop();
                    stack.pop();

                    stack.push(result);
                    
                    break;
    
                default:
                    break;
            }
        }
        
    } else {
        if (resultBox.textContent == "0") {
            resultBox.textContent = "";
        }

        resultBox.textContent += button.textContent;
    }

    printStack();
}));