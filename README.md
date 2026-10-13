# Robotics Kahoot-Style MCQ Quiz Web App

A responsive, high-energy Kahoot-style MCQ quiz web application featuring all 688 questions across 14 robotics topics from the Robotics MCQ Study Guide.

## ✨ Features
- **688 Curated MCQs**: All 14 core robotics topics with full explanations and answer rationale.
- **Topic Filter**: Easily select all or filter by individual topics (Sensors, Actuators, Electronics, ROS, Control, Kinematics, SLAM, Drones, Vision, etc.).
- **Kahoot Game Dynamics**:
  - 4 iconic colored answer buttons (▲ Red, ◆ Blue, ● Yellow, ◼ Green).
  - Keyboard shortcuts (`1`/`A`, `2`/`B`, `3`/`C`, `4`/`D`, `Space`/`Enter` to advance).
  - Timer modes (10s, 20s, 30s, or Untimed).
  - Streak multipliers and speed bonuses.
  - Native Web Audio API sound effects (no external audio files required).
- **Spaced Repetition / Missed Questions Drill**: Automatically tracks missed questions and lets you practice only missed questions in one click.

## 🚀 Running Locally
Simply open `index.html` in any browser, or run:
```bash
python3 -m http.server 3000
# or
npx serve
```
Then visit `http://localhost:3000`.
