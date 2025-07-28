export default function SuccessDisplay({ message }: { message: string }) {
  if (!message) return null
  return <p className="text-green-500 text-sm">{message}</p>
}
