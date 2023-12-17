# redux
Redux bizga state lar bilan ishlashda action lar hosil qilib bu actionlarni o'zimiz bilgan reducers bilan yanada clean roq code yozib tezroq boshqarish imkonini beradi.

// redux toolkitdan foydalanish uchun terminalga yozish kerak bo'lgan command lar
npm i reduxjs/toolkit
npm i react-redux

// data.js
agar data fetch qilinayotgan bo'lsa fetch function yozilib export qilinishi kerak. Agar data static bo'lsa data.js ochib olish va unga tashlab olinadi.
misol uchun
export default [
  {
  id: 1,
    title: 'Samsung Galaxy S7',
    price: 599.99,
    img: 'https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png',
    amount: 1,
    },
    {
    id: 2,
    title: 'google pixel ',
    price: 499.99,
    img: 'https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png',
    amount: 1,
  },
  {
    id: 3,
    title: 'Xiaomi Redmi Note 2',
    price: 699.99,
    img: 'https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png',
    amount: 1,
  }
]
