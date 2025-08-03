# AIContentDetect - Yapay Zeka İçerik Tespiti Uygulaması (Next.js 14)

Bu proje, haber ya da metin içeriklerinin yapay zeka tarafından üretilip üretilmediğini tespit etmeye yönelik bir demo sistemdir. Kullanıcılar metni girer, sistem AI üretimi olasılığını analiz eder ve etiketi verir.

---

## 🚀 Özellikler
- İçerik giriş formu
- Yapay zeka üretim skoru tahmini (%)
- Ortalama cümle uzunluğu ve bağlaç yoğunluğu analizi
- "İnsan Yazımı", "Hibrit", "Yapay Zeka Üretimi" sınıflandırması
- Tamamen **Next.js 14 (App Router)** ile oluşturuldu

---

## 📁 Proje Yapısı
```
/app
  /api
    /analyze
      route.ts       → API endpoint (POST)
  /ai-content-detect/page.tsx → Arayüz sayfası (frontend component)
/components/ui      → UI bileşenleri (shadcn/ui)
```

---

## 🧪 Kullanım
### Geliştirme Ortamını Başlat:
```bash
yarn install
yarn dev
```

### Giriş Sayfası
`http://localhost:3000/ai-content-detect`

---

## 📦 API Örneği
**POST /api/analyze**

#### Request Body
```json
{
  "text": "Türkiye 2025 yılında dijital kimlik sistemine geçiyor..."
}

#### Response
```json
{
  "aiScore": 68,
  "label": "Hibrit (AI destekli)",
  "avgSentenceLength": "9.2",
  "conjunctionDensity": "3.7",
  "model": "MockAnalyzer v0.1"
}
```

---

## 🧠 Notlar
- AI skoru şu anda örnek olarak üretilmektedir (random)
- Daha sonra HuggingFace veya GPTZero ile gerçek model entegre edilebilir

---

## 📜 Lisans
MIT License

---

## ✨ Geliştiren
Onur Göker & ChatGPT (OpenAI)

> Bu proje, yapay zeka içeriklerini haber yayıncılığında şeffaf şekilde analiz etmeyi hedefleyen bir prototiptir.