// const query = 'https://cursinho.com/?initValue=500&&email=foo%40hotmail.com&date=10%2F10%2F2015'

// // const params = new URLSearchParams({
// //     initValue: "500",
// //     endValue: "1000",
// //     email: "foo@hotmail.com",
// //     date: "10/10/2015",
// //   });
// //   console.log(params.toString());
// //   //Prints "var1=value&var2=value2&arr=foo"
// let url = new URL(query)
// let parames = new URLSearchParams(url.search)
// let val1 = parames.get("initValue")
// let val2 = parames.get("date")
// console.log(val1)
// console.log(val2)

// interface dataProps {
//     name: string
//     age: number
// }

const ten = ''

function teste(ten) {

    
    let calvo = ten??'fabricio'
    
    console.log(calvo)
}

teste(123)