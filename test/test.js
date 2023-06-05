let list = ["hi", "hello"];
console.log("before list: ", list);
list = '';
console.log("after list: ", list);



[   // multipleChoiceQuestion 배열
    {   //  각 Question 객체
        choice1 : "ㅂㅂㅂ", // 질문에 대한 보기
        choice2 : "ㅈㅈㅈ",
        choice3 : "ㄷㄷㄷ",
        choice4 : "ㄱㄱㄱ",
        choice5 : null,
        count : 4,  // 질문의 보기 개수
        id : 4, // 질문 id
        length : 5, // 답변 개수
        num : 1,    // 설문지 내에서의 질문 번호
        question : "1",  // 질문 제목

        multipleChoiceAnswers : [   // 이 질문에 대한 답변 (전체) 배열
            {id: 1, answer: 'ㅂㅂㅂ'},
            {id: 3, answer: 'ㄱㄱㄱ'},
            {id: 5, answer: 'ㅂㅂㅂ'},
            {id: 7, answer: 'ㅂㅂㅂ'},
            {id: 11, answer: 'ㅂㅂㅂ'},
        ],
    }
]