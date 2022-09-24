#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod random_array_generator;

pub use crate::random_array_generator::generate_random_array;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![get_random_array])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn get_random_array(array_size: u32) -> Vec<u32>
{
  let mixed_array = generate_random_array(array_size);

  return mixed_array;
}


