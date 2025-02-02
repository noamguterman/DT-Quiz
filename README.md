# 🎸 Dream Theater Song Quiz  

An **audio quiz app** that plays **song snippets** for users to guess. Built with **React**, incorporating **state management** and **audio playback features**.  

![Dream Theater Song Quiz](https://raw.githubusercontent.com/noamguterman/dt-quiz/refs/heads/main/dt-preview.png)  

## 🚀 Live Demo  
🔗 [Try Dream Theater Song Quiz](https://noamguterman.github.io/dt-quiz/)  

---

## 📝 Features  
✅ **Audio-based quiz** – Plays short song clips for users to guess the correct track.  
✅ **Randomized song selection** – Uses a shuffled song list for fresh gameplay each time.  
✅ **Score tracking & feedback** – Displays correct/incorrect answers and keeps a running score.  
✅ **Confetti effect & sounds** – Celebratory animation and sound effects for correct answers.  
✅ **Game result summary** – Shows final score and offers replay option.  
✅ **Fully responsive UI** – Optimized for desktop and mobile devices.  

---

## 🛠️ Tech Stack  
- **Frontend:** React, React Hooks  
- **State Management:** React useState, useEffect  
- **Audio Handling:** HTML5 Audio API, useRef  
- **UI Effects:** Confetti animations, dynamic button states  
- **Deployment:** GitHub Pages / Vercel  

---

## 🎯 How It Works  
1️⃣ Click **Start** to begin the quiz.  
2️⃣ A **song snippet** plays automatically.  
3️⃣ Choose one of the **multiple-choice answers**.  
4️⃣ If correct, a **+1 score is added** and confetti appears.  
5️⃣ Move to the **next song** until all are guessed.  
6️⃣ View your **final score** and play again!  

---

## 🏠 Project Structure  
```
/
  ├── src/
  │   ├── App.jsx            # Main game logic
  │   ├── data.js            # List of song snippets & metadata
  │   ├── components/
  │   │   ├── Quiz.jsx       # Quiz interface & controls
  │   │   ├── Scoreboard.jsx # Score tracking & results display
  │   ├── assets/            # Audio files & images
  │   ├── index.css          # Global styles
  ├── public/
  │   ├── index.html         # Entry point for React
  │   ├── favicon.svg        # Dream Theater logo
  ├── package.json           # Dependencies & scripts
  ├── README.md              # Project documentation
```

---

## 🛠️ Audio & UI Effects  
- **HTML5 Audio API** handles real-time music playback.  
- **Confetti.js** creates celebratory animations for correct answers.  
- **Styled UI Components** ensure a visually appealing experience.  

---

## 🌟 Why This Project?  
This project demonstrates **React-based state management**, **audio playback integration**, and **dynamic UI updates**. It showcases:  
✔️ **React Hooks for state & effects**  
✔️ **Real-time event handling (playback, user interaction)**  
✔️ **Game logic & scoring mechanics**  
✔️ **Audio-controlled UI components**  

---

## 🐝 License  
This project is for personal use and is not licensed for redistribution or modification.  

---
