# Second Largest Unique Number – DSA Problem

## 📌 Problem Statement
Given an array of integers, return the **second largest unique number** in the array.  
If a second largest number does not exist, return **-1**.


## 🧠 Approach

We solve this problem in **O(n)** time using a single traversal and **O(1)** extra space.

We maintain:
- `large` → largest number  
- `second_large` → second largest **unique** number  

As we loop through the array:
- If current number > largest → update both  
- Else if number < largest but > second largest → update second largest  
- Duplicate values of the largest are ignored  

If no valid second largest exists, return **-1**.

---

## 📑 Algorithm Steps

1. Initialize  
large = Integer.MIN_VALUE
second_large = Integer.MIN_VALUE

2. For each number:  
- If number > large → update both  
- Else if number > second_large AND number != large → update second_large  
3. If second largest was never updated → return **-1**  
4. Otherwise return `second_large`

---

## ⏱️ Time & Space Complexity

| Operation | Complexity |
|----------|------------|
| Time     | **O(n)**   |
| Space    | **O(1)**   |

---

## 🧪 Sample Input / Output (When Running Program)

**Input**
6
3 5 2 5 6 6

**Output**
Second largest is 5

**Input**
3
7 7 7

**Output**
Second largest is -1


---

## ▶️ How to Run This Code in VS Code

### 1️⃣ Open Terminal  
Ctrl + `
(or Terminal → New Terminal)

### 2️⃣ Compile  
javac SecondLargest.java

### 3️⃣ Run  
java SecondLargest

### 4️⃣ Enter Input  
Example:
6
3 5 2 5 6 6

---