'use client';
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Loader2 } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">AI İçerik Tespit Paneli</h1>
      <p className="text-muted-foreground">
        <Label htmlFor="content" className="text-base"><br/><br/>İçeriği aşağıya yapıştır</Label>
      </p>
      <p className="text-sm text-muted-foreground">
        <br/>Bu araç, metin içeriğinin yapay zeka tarafından mı yoksa insan tarafından mı yazıldığını analiz eder. Lütfen en az 50 kelime girin.<br/><br/>
      </p>
      <div className="space-y-3">
        <Textarea
          id="content"
          placeholder="Haber veya içerik metnini buraya yapıştırın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          cols={50}
          className="text-sm"
        />
        <br/><br/>
        <Button
          onClick={analyzeText}
          disabled={loading || text.length < 50}
          className="w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Analiz ediliyor...
            </span>
          ) : (
            <div className='gap-4'>Analiz Et</div>
          )}
        </Button>
      </div>

      {result && (
        <Card className="border border-muted bg-muted/30 backdrop-blur-sm">
          <CardContent className="p-6 space-y-3 text-sm leading-relaxed">
            <div><br></br></div>
            <div><strong>🧾 AI Skoru:</strong> {result.aiScore}%</div>
            <div><strong>🔍 Sonuç:</strong> {result.label}</div>
            <div><strong>✏️ Ortalama Cümle Uzunluğu:</strong> {result.avgSentenceLength} kelime</div>
            <div><strong>🔗 Bağlaç Yoğunluğu:</strong> %{result.conjunctionDensity}</div>
            <div className="text-xs text-muted-foreground"><br></br>Model: {result.model}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}