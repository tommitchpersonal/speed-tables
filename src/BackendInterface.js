const invoke = window.__TAURI__.invoke;

class BackendInterface {
    
    async GenerateArray(arraySize) {
        const array =  await invoke('get_random_array', {arraySize: arraySize});
        return array;
    }

    async IsCorrect(answer, xValue, yValue) {
        const isCorrect = await invoke('verify_answer', {answer:answer, xValue:xValue, yValue:yValue})
        return isCorrect;
    }
}

export default BackendInterface;