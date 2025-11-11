import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { v4 as uuidv4 } from "uuid"

interface ContextFormProps {
  onSubmit: (payload: any) => void
  isLoading?: boolean
}

export function ContextForm({ onSubmit, isLoading }: ContextFormProps) {
  const [form, setForm] = useState({
    service_id: "svc-01",
    metric_name: "cpu_usage",
    timestamp: new Date().toISOString().slice(0, 16),
    service_type: "web",
    runtime_env: "prod",
    time_slot: "peak",
    weight: "1.0",
    expected_users: "100",
  })

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      service_id: form.service_id,
      metric_name: form.metric_name,
      context: {
        context_id: uuidv4(),
        timestamp: new Date(form.timestamp).toISOString(),
        service_type: form.service_type,
        runtime_env: form.runtime_env,
        time_slot: form.time_slot,
        weight: parseFloat(form.weight),
        expected_users: parseInt(form.expected_users, 10),
      },
    }
    onSubmit(payload)
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>컨텍스트 기반 예측 요청</CardTitle>
        <CardDescription>
          서비스 정보와 컨텍스트를 입력하여 예측을 실행하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="service_id">Service ID</Label>
              <Input
                id="service_id"
                value={form.service_id}
                onChange={(e) => handleChange("service_id", e.target.value)}
                placeholder="svc-01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="metric_name">Metric Name</Label>
              <Input
                id="metric_name"
                value={form.metric_name}
                onChange={(e) => handleChange("metric_name", e.target.value)}
                placeholder="cpu_usage"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timestamp">Timestamp</Label>
            <Input
              id="timestamp"
              type="datetime-local"
              value={form.timestamp}
              onChange={(e) => handleChange("timestamp", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="service_type">Service Type</Label>
              <Select value={form.service_type} onValueChange={(value) => handleChange("service_type", value)}>
                <SelectTrigger id="service_type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="db">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="runtime_env">Runtime Environment</Label>
              <Select value={form.runtime_env} onValueChange={(value) => handleChange("runtime_env", value)}>
                <SelectTrigger id="runtime_env">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="prod">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time_slot">Time Slot</Label>
              <Select value={form.time_slot} onValueChange={(value) => handleChange("time_slot", value)}>
                <SelectTrigger id="time_slot">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peak">Peak</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                placeholder="1.0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expected_users">Expected Users</Label>
              <Input
                id="expected_users"
                type="number"
                min="0"
                value={form.expected_users}
                onChange={(e) => handleChange("expected_users", e.target.value)}
                placeholder="100"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "예측 중..." : "예측 실행"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

