
function fac(num){
    const arr = [];

    for(let i = 0; i<num; i++){
        arr.push(i);
    }

    const answer = arr.reduce((prev, curr) => prev * curr, 1);

    console.log(answer);

    return answer;
}

const GIVEN_ARRAY = [[4, 2, 3], [4, [3, 4, [5, 3]], 5], [4, 3, 5]]
const RESULT_ARRAY = [4, 2, 3, 4, 3, 4, 5, 3, 5, 4, 3, 5]


const GIVEN_ARRAY2 = [[5, [3, [5, [6, [5, 4]]]], 3, [6, 246]]]
const RESULT_ARRAY2 = [5, 3, 5, 6, 5, 4, 3, 6, 246]

function flat(list){

    let result = list.reduce((prev, curr) =>{
        if(curr.length<1){
            return;
        }
        return flat(prev.concat(curr));
    } , []);

    return result;
}