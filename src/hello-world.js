
export class HelloWorld {
    constructor() {
        console.log('Constructing HelloWorld class');
    }

    doCoolStuff() {
        console.log('I\'m doing cool stuff... ');
    }

    get name() {
        return 'My name is Hello World example';
    }

    es6demo() {                
        [1,2,3,4,5].map(x => console.log('===== ', x));
    }
}