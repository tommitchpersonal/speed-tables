pub fn check_answer(entered_answer: String, x_value: String, y_value: String) -> bool {

    let parsed_answer = parse_value(&entered_answer);

    if parsed_answer == 0 {
        return false;
    }

    let parsed_x_value = parse_value(&x_value);

    if parsed_x_value == 0 {
        return false;
    }

    let parsed_y_value = parse_value(&y_value);

    if parsed_y_value == 0 {
        return false;
    }

    return verify_single_value(parsed_answer, parsed_x_value, parsed_y_value);
}

pub fn verify_completion(grid: Vec<Vec<String>>) -> bool {

   for i in (1..grid.len()).step_by(1) {
        for j in (1..grid.len()).step_by(1) {
            let x_value = parse_value(&grid[i][0]);
            let y_value = parse_value(&grid[0][j]);
            let entered_answer = parse_value(&grid[i][j]);

            if !verify_single_value(entered_answer, x_value, y_value) {
                return false;
            }
        }
   } 

   return true;
}

fn parse_value(value: &String) -> u32 {

    let parsed_value_result = value.parse::<u32>();

    let parsed_value = match parsed_value_result {
        Ok(value) => value,
        Err(_error) => 0
    };

    return parsed_value;
}

fn verify_single_value(value: u32, x_value: u32, y_value: u32) -> bool {

    return value == x_value * y_value;
}