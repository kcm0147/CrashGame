# CrashGame

HTML의 canvas와 JS로 만든 벽돌깨기 게임입니다.

마우스로 Paddle을 조작하면서 벽돌을 최대한 많이 깨는 게임입니다

[여기](https://kcm0147.github.io/CrashGame/) 를 클릭하시면 게임을 진행하실 수 있습니다

<br/>

- - -

### Main Page

메인 페이지는 아래와 같이 랜덤으로 공의 갯수와 색이 지정된 공들이 튀어다니는 페이지를 만들었습니다

**Game Start** 버튼을 클릭할 시에 Game Page로 넘어가게 됩니다

![스크린샷 2021-04-27 오후 7 10 28](https://user-images.githubusercontent.com/57346393/116225957-644e1c00-a78d-11eb-8dd5-29a36b46f994.png)


- - -

### Game Page


게임 시작페이지 입니다.

![스크린샷 2021-04-27 오후 7 24 51](https://user-images.githubusercontent.com/57346393/116226702-47feaf00-a78e-11eb-9c43-8e9c616ac113.png)

왼쪽에는 각 오브젝트들이 어떤 것을 의미하는지 설명이 적혀있습니다.

벽돌에 색에 따라서 공이 부딪혀야하는 횟수가 다릅니다.

공의 속도는 시간이 흐름에 따라 미세하기 **증가하도록** 하였습니다.

- - - -

<br/>

### 아이템 소개

일정 확률로 아이템 두 가지 중 하나가 나올 수 있습니다

첫번째로 `Fire` 입니다.

Fire 공을 먹으면 공이 외부 벽에 부딪히기 전까지는 벽돌에 맞닿을 때

관통하여 벽돌을 한번에 부수게 해줍니다. 다만 벽돌을 깨고나서 벽에 부딪힌다면 효과는 바로 사라집니다.

![스크린샷 2021-04-27 오후 7 24 27](https://user-images.githubusercontent.com/57346393/116230523-b6457080-a792-11eb-8213-d8244f7c3cba.png)

![스크린샷 2021-04-27 오후 7 24 35](https://user-images.githubusercontent.com/57346393/116230528-b80f3400-a792-11eb-8edd-c85e49c2de8a.png)


- - - -

두번째 아이템은 `Wide Paddle` 입니다.

Wide Paddle 아이템을 먹으면 약 7초동안 Paddle의 넓이가 넓어집니다.


![스크린샷 2021-04-27 오후 7 23 18](https://user-images.githubusercontent.com/57346393/116230616-d1b07b80-a792-11eb-86b3-053019812132.png)

![스크린샷 2021-04-27 오후 7 23 46](https://user-images.githubusercontent.com/57346393/116230608-cfe6b800-a792-11eb-8990-32bb64d19b02.png)

- - - -