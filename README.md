# 아카콘 미러

### 🌏Website : https://lemondouble.github.io/arca-con-mirror/

![image](https://user-images.githubusercontent.com/31124212/214198604-d8eef800-0a4e-4934-a731-61088770fff5.png)

### 목적
* 아카라이브의 아카콘( [Link](https://arca.live/e/?p=1) ) 을 미러링하고, 검색 및 ***Zip 다운로드***를 지원합니다.
* 파일 하나하나 다운받다가 화나서 만들었습니다.

### 아키텍쳐

![image](https://user-images.githubusercontent.com/31124212/214200963-c1cc14dd-957d-442b-b6f5-f4e35fd7fc63.png)


* 서버를 직접 관리하기 싫으므로, 클라우드와 Github 기능을 섞어 서버 없이 만들었습니다. S3/Cloudfront 돈만 내면 서버 관리 없이 돌아갑니다 (?) 
* 크게 다음 기능으로 구현됩니다.
    * 크롤러(Main 브랜치) : Github schedule Actions로 자동으로 실행됩니다. 아카콘 긁어서 S3에 업로드하고, [db.json](https://github.com/LemonDouble/arca-con-mirror/blob/main/src/database/db.json) 을 업데이트합니다.
    * frontend : Next.js 코드를 넣습니다. Push시 Github Actions를 통해 자동 build/export 이후 gh-pages 페이지로 푸시됩니다.
    * gh-pages : Github Pages로 Staic Site를 서빙합니다.
    * S3/Cloudfront : 크롤링한 아카콘을 저장하고, CDN으로 서빙합니다.
* ZIP 다운로드 기능은, 브라우저 상에서 [JSZip](https://stuk.github.io/jszip/) 으로 구현됩니다.

### Special Thanks

* [shiroko-kfcc](https://github.com/if1live/shiroko-kfcc) 프로젝트를 보고 감명받아 비슷한 아키텍쳐로 만들어 봤습니다. 좋은 아이디어 주신 [if1live](https://github.com/if1live)님 감사합니다!
