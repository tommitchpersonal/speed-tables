pub fn parse_and_verify_answer(entered_answer: String, x_value: String, y_value: String) -> bool {

    let parsed_answer_result = entered_answer.parse::<u32>();

    let parsed_answer = match parsed_answer_result {
        Ok(answer) => answer,
        Err(_error) => return false // if we cannot parse the answer then it is incorrect as it is NaN.
    };

    let parsed_x_value_result = x_value.parse::<u32>();

    let parsed_x_value = match parsed_x_value_result {
        Ok(value) => value,
        Err(_error) => return false
    };

    let parsed_y_value_result = y_value.parse::<u32>();

    let parsed_y_value = match parsed_y_value_result {
        Ok(value) => value,
        Err(_error) => return false
    };

    return verify_single_value(parsed_answer, parsed_x_value, parsed_y_value);
}


fn verify_single_value(value: u32, x_value: u32, y_value: u32) -> bool {
    
    return value == x_value * y_value;
}