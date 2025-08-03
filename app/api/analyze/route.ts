// Next.js API Route - app/api/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || text.length < 50) {
    return NextResponse.json({ error: 'Yetersiz içerik.' }, { status: 400 });
  }

  // Basit istatistik analizleri (gelişmiş AI modeli yerine dummy skorlar)
  const sentenceCount = text.split(/[.!?]/).length;
  const wordCount = text.split(/\s+/).length;
  const avgSentenceLength = (wordCount / sentenceCount).toFixed(1);

  const conjunctions = ['ve', 'ama', 'fakat', 'çünkü', 'ancak'];
  const conjunctionDensity = (
    conjunctions.reduce((acc, c) => acc + (text.match(new RegExp(`\\b${c}\\b`, 'gi'))?.length || 0), 0) /
    wordCount * 100
  ).toFixed(1);

  // Dummy AI score
  const aiScore = Math.min(100, Math.round(20 + Math.random() * 60));
  let label = 'İnsan Yazımı';
  if (aiScore > 75) label = 'Yapay Zeka Üretimi';
  else if (aiScore > 45) label = 'Hibrit (AI destekli)';

  return NextResponse.json({
    aiScore,
    label,
    avgSentenceLength,
    conjunctionDensity,
    model: 'MockAnalyzer v0.1'
  });
}