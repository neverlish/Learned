#[cfg(test)]
mod tests {
    #[test]
    fn array_test() {
        let a1 = [100, 200, 300];
        let a2 = [100, 200, 300];

        assert_eq!(a1, a2);

        let a3 = [
            "사과".to_string(),
            "바나나".to_string(),
        ];

        let a4 = [
            String::from("사과"),
            String::from("바나나"),
        ];

        assert_eq!(a3, a4);
    }

    #[test]
    fn vec_test() {
        let v1 = vec!["apple", "banana", "mango"];
        let mut v2: Vec<&str> = Vec::new();
        v2.push("apple");
        v2.push("banana");
        v2.push("mango");

        assert_eq!(v1, v2);
    }
}
