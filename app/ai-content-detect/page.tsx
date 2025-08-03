'use client';
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

export default function AIContentDetect() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeText = async () => {
    setLoading(true);
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">AI İçerik Tespit Paneli</h1>
      <div className="space-y-2">
        <Label htmlFor="content">İçerik</Label>
        <Textarea
          id="content"
          placeholder="Haber veya içerik metnini buraya yapıştırın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />
        <Button onClick={analyzeText} disabled={loading}>
          {loading ? 'Analiz ediliyor...' : 'Analiz Et'}
        </Button>
      </div>

      {result && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <p><strong>AI Skoru:</strong> {result.aiScore}%</p>
            <p><strong>Sonuç:</strong> {result.label}</p>
            <p><strong>Ortalama Cümle Uzunluğu:</strong> {result.avgSentenceLength} kelime</p>
            <p><strong>Bağlaç Yoğunluğu:</strong> %{result.conjunctionDensity}</p>
            <p className="text-sm text-muted-foreground">Model: {result.model}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}