const { GREETING } = process.env;

const fn = function(param) {
    console.log(param);
}

fn(GREETING);