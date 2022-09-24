use rand::Rng;

pub fn generate_random_array(array_size: u32) -> Vec<u32>
{
    let mut array = generate_unmixed_array(array_size);
    shuffle(&mut array);
    return array;
}

fn generate_unmixed_array(size: u32) -> Vec<u32>
{
    let mut array: Vec<u32> = Vec::new();

    for i in (1..=size).step_by(1) {
        array.push(i);
    }

    return array;
}

fn shuffle(array: &mut Vec<u32>) {

    let mut index = array.len() - 1;

    while index > 0 {

        let to_swap_index = rand::thread_rng().gen_range(0..=index);

        let to_swap_index_entry = array[to_swap_index];
        let index_entry = array[index];

        array[index] = to_swap_index_entry;
        array[to_swap_index] = index_entry;

        index = index - 1;
    }
}