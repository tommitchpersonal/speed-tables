const invoke = window.__TAURI__.invoke;

class BackendInterface {
    
    async generateArray(arraySize) {
        const array =  await invoke('get_random_array', {arraySize: arraySize});
        return array;
    }

    async isCorrect(answer, xValue, yValue) {
        const isCorrect = await invoke('verify_answer', {answer:answer, xValue:xValue, yValue:yValue});
        return isCorrect;
    }

    async verifyCompletion(grid) {
        const isCompleted = await invoke('check_whether_completed', {grid:grid});
        return isCompleted;
    }
}

export default BackendInterface;