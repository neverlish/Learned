// fn main() {
//     struct 튜구(
//         i32,
//         f32,
//         char,
//         [u8;5]
//     );

//     let data = 튜구(10_000_000, 3.14, 'A', [10,20,30,40,50]);
//     println!("{} {} {}", data.0, data.1, data.2);

//     let data2 = 튜구(700, 1.2, 'B', [1,2,3,4,5]);
// }

// fn main() {
//     const MAX: u8 = 100;
//     const MIN: u8 = 10;

//     struct CustMaster{}
//     struct CustDetail{}
//     enum EmpGrad{}

//     // let custName = "홍길동";

//     let cust_mas;
//     let cust_detail;
// }

struct 도서 {
    제목: String,
    저자: String,
    위치: Option<String>
}

impl 도서 {
    fn 새로운(제목: String, 저자: String) -> 도서 {
        도서 {
            제목,
            저자,
            위치: None
        }
    }

    fn 위치_설정(&mut self, 위치: String) {
        self.위치 = Some(위치);
    }

    fn 위치_확인(&self) -> Result<&String, String> {
        match &self.위치 {
            Some(위치) => Ok(위치),
            None => Err("도서 위치가 설정되어 있지 않습니다.".to_string())
        }
    }
}

fn main() {
    let mut 책 = 도서::새로운("Rust프로그래밍".to_string(), "홍길동".to_string());
    책.위치_설정("거실 책장 2단".to_string());

    match 책.위치_확인() {
        Ok(위치) => println!("도서위치:{}", 위치),
        Err(e) => println!("오류:{}", e)
    }

}