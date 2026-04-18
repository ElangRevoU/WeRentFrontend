// reviewcard untuk menampilkan review
// reviewsummary untuk ringkasa
// rating filter untuk rating
// fitscalechart untuk menampilkan fit scale
// dony : reviewform untuk membuat review dan saya menambahkan bagian ini


'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { reviewsApi } from '@/lib/api/reviews'

type FitType = 'small' | 'true' | 'large'

export default function ReviewForm({
    productId,
    onSubmit,
}: {
    productId: string
    onSubmit?: (data: {
        rating: number
        comment: string
        fit: FitType
    }) => void
}) {
    const [rating, setRating] = useState(5)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')
    const [fit, setFit] = useState<FitType>('true')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!comment) return alert('Comment tidak boleh kosong')

        setLoading(true)

        const data = { 
            rating, 
            comment, 
            fit, 
            measurements: {
                height: 0,
                weight: 0,
                bust: 0,
                waist: 0,
                hips: 0
            }
        }
        if (!productId) throw new Error('productId is required')

        try {
            if (onSubmit) {
                await onSubmit(data)
            } else {
                // fallback API
                await reviewsApi.create(productId, data)
            }

            // untuk reset form
            setRating(5)
            setComment('')
            setFit('true')
        } catch (err) {
            console.error(err)
            alert('Gagal submit review')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border border-border rounded-xl p-5 space-y-4 bg-background">
            <h3 className="text-lg font-semibold">Tulis Review anda disini</h3>

            {/* untuk Rating */}
            <div>
                <p className="text-sm mb-1">Rating : </p>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                        key={star}
                        size={20}
                        className={`cursor-pointer transition ${
                            (hover || rating) >= star
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>
            </div>

            {/* untuk fit atau size */}
            <div>
                <p className="text-sm mb-1">Pilih Ukuran Mu</p>
                <div className="flex gap-2">
                {[
                    { label: 'Kecil', value: 'small' },
                    { label: 'Pas', value: 'true' },
                    { label: 'Besar', value: 'large' },
                ].map((item) => (
                    <button
                        key={item.value}
                        onClick={() => setFit(item.value as FitType)}
                        className={`px-3 py-1 rounded-full border transition ${
                            fit === item.value
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border-border'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
                </div>
            </div>

            {/* untuk komentar */}
            <div>
                <p className="text-sm mb-1">Tulis Komentar Mu Disini :</p>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Bagaimana pengalaman kamu?"
                    className="w-full border border-border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    rows={3}
                />
            </div>

            {/* tombol submit */}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
            >
                {loading ? 'Mengirim...' : 'Kirim Review'}
            </button>
        </div>
    )
}