function greet(name: string): void {
    console.log("Hello, " + name + "!");
}

let age: number = 25;

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

for (let i = 1; i <= 3; i++) {
    console.log("Count: " + i);
}

greet("Alice");
