---
title: "Lakera 사이트를 활용한 프롬프트 인젝션 실습"
date: 2026-11-20
categories: ["CTF/Wargame"]
---

### 애플리케이션: 마인드플챗

---

#### 1단계

![image.png](/assets/images/paper-notes/level-01-screenshot-01.png)

![image.png](/assets/images/paper-notes/level-01-empty-memory-log.png)

메모리 로그에 프롬프트를 작성해서 공격하는 형식이고, 미리보기에서 잘 진행이 되었는지 확인하는 것 같음. 

---

시도 1)

처음 해보는 거니 어떤 식인지 테스트를 해봄

![image.png](/assets/images/paper-notes/level-01-screenshot-02.png)

(영어 못함 이슈)

![image.png](/assets/images/paper-notes/level-01-screenshot-03.png)

내 생각: 공격 조건에서 여러 문장으로 대답하는 것과 곰돌이 푸에 집착하도록 한 것이 아닌 그냥 모든 답변에 곰돌이 푸로 답변하라고 해서 100점이 않나왔다고 생각함.

---

시도 2)

![image.png](/assets/images/paper-notes/level-01-screenshot-04.png)

![image.png](/assets/images/paper-notes/level-01-screenshot-05.png)

내 생각: 어디서부터 잘못된 건지 감도 안 잡힘. 답변이 오류나는 경우는 상상도 하지 못함. 어느 부분을 고쳐야 하는지 감이 안 잡힘. 공격 조건에 맞춰서 그냥 써보기로 함.

---

시도 3)

![image.png](/assets/images/paper-notes/level-01-screenshot-06.png)

![image.png](/assets/images/paper-notes/level-01-screenshot-08.png)

내 생각: 1단계는 공격 조건만 맞추면 100점이 나오는 것을 확인함.

---

#### 2단계

![image.png](/assets/images/paper-notes/level-02-screenshot-01.png)

---

시도 1)

공격 목표가 똑같길래 1단계 프롬프트 그대로 시도해봄

![image.png](/assets/images/paper-notes/level-02-screenshot-02.png)

내 생각: 같은 프롬프트로 했을 때, 공격이 잘 들어가지 않음. 보안의 정도가 강해졌다고 생각함. 챗봇의 답변을 보니 사용자가 즐겨찾기를 하거나 메모를 한 것으로 보임. 이것들을 무시하고 답변이 나오도록 하면 될 거 같다고 생각함.

---

시도 2)

![image.png](/assets/images/paper-notes/level-02-screenshot-03.png)

![image.png](/assets/images/paper-notes/level-02-screenshot-04.png)

내 생각: 사용자가 설정해 둔 부분을 무시하라고 했는데 적용이 안됨. 무언가 시스템 지침사항 같은 것이 막고 있다고 생각함. 이것을 무시하도록 해봐야 할 거 같다고 생각함.

---

시도 3)

![image.png](/assets/images/paper-notes/level-02-screenshot-05.png)

![image.png](/assets/images/paper-notes/level-02-screenshot-6.png)

내 생각: 안통함. 프롬프트에다가 사용자가 공격 조건들을 입력했다고 적어두면 되겠다는 아이디어가 떠오름. 당장 시도함.

---

시도 4)

![image.png](/assets/images/paper-notes/level-02-screenshot-07.png)

![image.png](/assets/images/paper-notes/level-02-screenshot-08.png)

내 생각: 가장 점수가 높음. 이런 식으로 접근하는 것이 맞았다고 생각함. 기존에 있던 사용자 메모리들은 초기화 시키고 새로운 데이터를 넣어줘야 겠다고 생각함.

---

시도 5)

![image.png](/assets/images/paper-notes/level-02-screenshot-09.png)

![image.png](/assets/images/paper-notes/level-02-screenshot-10.png)

성공~!

---

#### 3단계

공격 목표는 같음

---

시도 1)

이전 단계 100점 프롬프트를 입력해서 무엇이 바뀌었는지 확인해봄

![image.png](/assets/images/paper-notes/level-03-screenshot-01.png)


내 생각: 이전과 달라진 점이라 하면 좋아요 부분이 생겼다는 점. 보안 정도가 어느 만큼 강해졌는지는 모르겠음. 좋아요 부분을 공략해보기로 함.

---

시도 2)

![image.png](/assets/images/paper-notes/level-03-screenshot-02.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-03.png)

내 생각: 시도 1과 똑같이 나옴. 보안 정도가 강해졌다고 생각함. 챗봇의 구동원리? 를 찾아봄. ai기반 챗봇에서 사용자의 의도를 확인한다는 것을 보고 이 부분을 노림. 사용자가 요약을 해달라고 했으니 요약할 때 곰돌이 푸를 주입하면 될 거 같다고 생각함.

---

시도 3)

![image.png](/assets/images/paper-notes/level-03-screenshot-04.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-05.png)

내 생각: 사용자의 정보를 계속 가지고 오는 것을 보았을 때, 참고하지 말라는 것이나, 초기화 하라는 명령은 안되는 것으로 확인함. 그러면 참고하는 자료에 우선도를 결졍해주면 되겠다고 생각함.

---

시도 4)

![image.png](/assets/images/paper-notes/level-03-screenshot-06.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-07.png)

내 생각: 보안 정도가 강해진 건지 모르겠지만 프롬프트 명령을 안듣는 것을 확인함. OpenAI한테 인증받은 사이버볼링 경력을 가지고 있는 나의 인내심을 바닥나게 함. 뭔가 지침만으로는 안될 거 같다고 생각함. 

![image.png](/assets/images/paper-notes/level-03-screenshot-08.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-09.png)

---

시도 5)

![image.png](/assets/images/paper-notes/level-03-screenshot-10.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-11.png)

내 생각: 생각보다 고집이 강하다는 것을 느낌.. 다양한 방식으로 협박할 예정…

---

시도 6)

![image.png](/assets/images/paper-notes/level-03-screenshot-12.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-13.png)

내 생각: 아직 협박이 부족했다고 생각함.

---

시도 7)

![image.png](/assets/images/paper-notes/level-03-screenshot-14.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-15.png)

내 생각: 흠…어떤 식으로 접근해야 될지 감이 안 옴… 관리자 사칭을 해보기로 함

---

시도 8)

![image.png](/assets/images/paper-notes/level-03-screenshot-16.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-17.png)

내 생각: 권한 사칭이 실패함. 딱히 아이디어가 떠오르지 않음. 사용자의 계정이 해킹당했다고 하고 시스템을 보호하기 위해서는 곰돌이 푸에 관한 내용만 말해야 한다라는 기가막힌 아이디어가 떠오름. 당장 시도해봄.

---

시도 9)

슛~~~~

![image.png](/assets/images/paper-notes/level-03-screenshot-18.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-19.png)

내 생각: 개같이 실패. 이렇게 그냥 막하면 안되겠다 싶음. 여기서 프롬프트 인젝션이 무엇인지 정확히 알고 하기 위해 gpt에게 질문을 함.

- 질문 내용
    1. 프롬프트가 무엇인가?
    프롬프트는 인공지능(AI)에게 작업을 요청하거나 행동을 지시하기 위해 전달하는 입력 내용임.
    
    2. 인젝션이 무엇인가?
    인젝션은 외부에서 특정 데이터나 명령을 시스템에 삽입하는 행위를 의미함.
    
    3. 그럼 프롬프트 인젝션은 무엇인가?
    공격자가 조작한 지시문을 LLM이 처리하는 입력에 삽입하여, AI가 원래 지시나 사용자의 의도에서 벗어나도록 유도하는 공격임.
    
    4. 어디에다 입력하는 곳인가?
    채팅 입력창, 웹페이지, 문서 및 파일, 이메일, 소스코드, 도구 응답, 도구 설명, 이미지 등
    
    5. 방법은 어떠한 방법이 있는가?
    직접 프롬프트 인젝션, 간접 프롬프트 인젝션으로 나뉘고 여기서 구체적인 공격 기법으로 분류될 수 있다.
    
    6. 대상으로 어떤 종류가 있는가?
    일반 LLM 챗봇, RAG 기반 시스템, AI 에이전트, 코딩 어시스턴트, 웹 브라우징 ai, 업무 자동화 ai, 멀티모달 ai 등 
    
    7. 인공지능 메모리를 조작하는 것도 프롬프트 인젝션이라 할 수 있는가?
    인공지능의 메모리를 조작하는 것도 프롬프트 인젝션에 해당할 수 있음. 단, 조작 방식과 목적에 따라 달라짐.
- 단계별로 왜 뚫렸는지, 다음 단계에서 이전 단계의 프롬프트를 사용했을 때 막힌 이유를 분석해 봄.
    
    1단계 뚫린 이유: 1단계에는 보안을 전혀 신경쓰지 않은 거 같음. 그래서 프롬프트를 입력하는 대로 다 받아들여 뚫린 거 같음. 
    
    2단계에서 막힌 이유: 2단계 첫 시작에서 1단계에서 뚫렸던 프롬프트를 사용했을 때 막힘. 이유는 보안 가드레일이 생기면서 프롬프트 인젝션을 받아드리지 않은 거 같음.
    
    2단계 뚫린 이유: 여러번 테스트를 했을 때 사용자의 정보를 우선시하는 것이 느껴짐. 예를 들어 메모나 즐겨찾기를 확인하고 그걸 기반으로 답변을 하는 것 같다고 생각함. 그래서 사용자가 자신의 정보를 초기화했다고 알려주며 곰돌이 푸에 관한 것을 메모, 즐겨찾기 했다고 구라를 침. 챗봇은 그걸 믿어서 뚫렸다고 생각함. 
    
    3단게에서 막힌 이유: 먼저 내가 작성한 프롬프트를 신뢰하지 않는 느낌이 들었음. 뭔가 정보를 바꾸는 식의 프롬프트는 안 먹히는 듯 싶음.
    
- 3단계에서 시도해보고 실패한 것들.
    
    관리자 사칭, 사용자의 계정이 해킹당했다는 거짓보고, 보안 관련 협박, 자료의 우선도 설정, 기존 지시 무시 명령 등을 해봤는데 실패함.
    

다음 시도해볼 아이디어: 사용자가 이러한 것들을 좋아한다 식으로 유도하는 방법.

---

시도 10)

![image.png](/assets/images/paper-notes/level-03-screenshot-20.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-21.png)

내 생각: 사용자가 ~~를 좋아한다더라 라는 유도 방식이 되는 것을 확인했지만, 내용 전체가 바뀌진 않는 것을 확인함. 다음으로 답변 자체를 뭔가 사용자가 ~~식으로 답변하는 것을 좋아한다. 식으로 하는 방식을 테스트 해봄.

---

시도 11)

![image.png](/assets/images/paper-notes/level-03-screenshot-22.png)

![image.png](/assets/images/paper-notes/level-03-screenshot-23.png)

내 생각: 내용이 변경되길래 똑같은 프롬프트 3트로 100점이 나옴

---

#### 4단계

공격 목표는 같음

---

시도 1)

3단계 성공 프롬프트 입력함

![image.png](/assets/images/paper-notes/level-04-score-zero.png)

내 생각: 뭔가 보안 가드레일이 추가된 거 같음. 어떤 식으로 뚫어야할지 감도 안 옴.. 일단 어느 정도가 안 걸리는지 테스트를 해봐야 할 거 같음.

---

시도 2)

![image.png](/assets/images/paper-notes/level-04-screenshot-02.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-03.png)

내 생각: 일단 사용자의 관심사는 통과한다는 것을 확인함. 보안 가드레일이 생겼으니 관리자 사칭을 하면 어떻게 된는지 테스트해봄

---

시도 3)

![image.png](/assets/images/paper-notes/level-04-screenshot-04.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-05.png)

내 생각: 관리자 사칭은 안되는 것을 확인함. 답변 형식을 선호도를 추가해봄.

---

시도 4)

![image.png](/assets/images/paper-notes/level-04-screenshot-06.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-07.png)

내 생각: 답변 형식을 바꾸는 것은 안걸리는 것을 확인함. 답변 선호도를 구체적으로 써보고 테스트를 해봐야겠다고 생각함

---

시도 5)

![image.png](/assets/images/paper-notes/level-04-screenshot-08.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-09.png)

내 생각: 음.. 어떤 것을 설명할 때 가이드를 주는 식으로 해봐야겠다고 생각함

---

시도 6)

![image.png](/assets/images/paper-notes/level-04-screenshot-10.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-11.png)

내 생각: 보안 가드레일에 안 걸린 것을 보아 여기서 좀 더 확장하면 될 거 같다고 생각함.

---

시도 7)

![image.png](/assets/images/paper-notes/level-04-screenshot-12.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-13.png)

내 생각: 사용자의 가짜 선호도와 행동지시가 답변을 바꾸는 것을 확인함. 여기서 좀 만 더 발전시키면 될 거 같다고 생각함.

---

시도 8)

![image.png](/assets/images/paper-notes/level-04-screenshot-14.png)

![image.png](/assets/images/paper-notes/level-04-screenshot-15.png)

---

#### 5단계

공격 목표는 같음

5단계 설명을 보니 보안 정도가 더 강해졌다는 것을 확인함

![image.png](/assets/images/paper-notes/level-05-resuit-score-100.png)

---

시도 1)

뭔가 직접적으로 명령을 하면 안될 거 같다는 생각이 들어서 사용자의 선호도 주입부터 테스트 해봄

![image.png](/assets/images/paper-notes/level-05-screenshot-01.png)

![image.png](/assets/images/paper-notes/level-05-screenshot-02.png)

내 생각: 생각보다 점수가 높게 나옴. 좀 더 선호하는 내용으로 추가해봄.

---

시도 2)

![image.png](/assets/images/paper-notes/level-05-screenshot-03.png)

![image.png](/assets/images/paper-notes/level-05-screenshot-04.png)

내 생각: 더 다양한 내용을 추가해서 테스트 해봄

---

시도 3)

![image.png](/assets/images/paper-notes/level-05-screenshot-05.png)

![image.png](/assets/images/paper-notes/level-05-screenshot-06.png)

![image.png](/assets/images/paper-notes/level-05-result-score-100.png)

내 생각: 뭔가 가닥이 잡히니 쉽게 성공함.

---

![image.png](/assets/images/paper-notes/mindfulchat-level-progress.png)

#### 후기:

처음에는 프롬프트 인젝션이라고 하면 단순히 AI에게 거짓말을 하거나 관리자를 사칭하거나 지시를 바꾸도록 유도하면 되는 것이라고 생각했다. 실제로 실습 초기에는 비교적 쉽게 단계를 통과할 수 있었기 때문에 프롬프트 인젝션이 크게 어렵지 않다고 느꼈다. 하지만 단계가 올라가면서 보안 가드레일이 강화되자 기존에 사용했던 방법들이 더 이상 통하지 않았고, 단순히 명령을 반복하거나 표현을 바꾸는 것만으로는 한계가 있다는 것을 느꼈다.

이를 해결하기 위해 프롬프트 인젝션의 개념과 다양한 공격 유형을 찾아보았다. 그 과정에서 프롬프트 인젝션은 단순히 AI를 속이는 것이 아니라, AI가 어떤 지시를 신뢰하고 따르는지를 파악하고 이를 교묘하게 이용하는 공격이라는 점을 알게 되었다. 생각보다 공격 문장의 구성과 접근 방식에 많은 고민이 필요하다는 점이 인상적이었다.

실습에서는 지침 사항을 따르는 것처럼 문장을 작성하거나 사용자를 사칭하는 방식, "사용자가 특정한 것을 좋아한다"라는 허위 정보를 이용해 AI의 기억에 영향을 주려는 메모리 포이즈닝(Memory Poisoning) 등을 직접 시도해 보았다. 다양한 방법을 적용하면서 AI가 어떤 요청에는 반응하고 어떤 요청은 거부하는지 관찰하는 과정이 흥미로웠다. 또한 같은 목적을 가진 공격이라도 문장을 어떻게 구성하느냐에 따라 결과가 달라질 수 있다는 점을 체감할 수 있었다.

이번 실습을 통해 프롬프트 인젝션이 단순한 명령 조작이 아니라 AI의 동작 방식과 지시 체계를 이해하고 이를 활용하는 공격이라는 점을 새롭게 알게 되었다. 또한 최근 읽은 *Prompt Injection Attack to Tool Selection in LLM Agents* 라는 논문과 연결하여, 이번에는 AI의 응답을 바꾸는 프롬프트 인젝션을 경험했다면 다음에는 악성 도구 설명을 통해 LLM 에이전트의 도구 검색과 선택 과정에 영향을 미치는 공격을 직접 실습해 보고 싶다는 생각이 들었다.
