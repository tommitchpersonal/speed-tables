#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod random_array_generator;
mod answer_verifier;

pub use crate::random_array_generator::generate_random_array;
pub use crate::answer_verifier::check_answer;
pub use crate::answer_verifier::verify_completion;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![get_random_array, verify_answer, check_whether_completed])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// APIs:

#[tauri::command]
fn get_random_array(array_size: u32) -> Vec<u32> {
  return generate_random_array(array_size);
}

#[tauri::command]
fn verify_answer(answer: String, x_value: String, y_value: String) -> bool {
  return check_answer(answer, x_value, y_value);
}

#[tauri::command]
fn check_whether_completed(grid: Vec<Vec<String>>) -> bool {
  return verify_completion(grid);
}


