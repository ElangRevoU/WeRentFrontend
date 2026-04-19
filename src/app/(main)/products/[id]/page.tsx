"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  useProductDetail,
  useAvailability,
  useReviewSummary,
} from "@/lib/hooks/useProducts";
import { useAddToCart } from "@/lib/hooks/useCart";
import { useToggleWishlist, useWishlist } from "@/lib/hooks/useWishlist";
import { ReviewSummary } from "@/components/review/ReviewSummary";
import { StarRating } from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/lib/stores/authStore";

import dummydata from "@/assets/dummydata/products.json";
import dummysummary from "@/assets/dummydata/summary.json";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [selectedSize, setSelectedSize] = useState("");
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [rentalDays, setRentalDays] = useState(3);

  // const { data: product, isLoading } = useProductDetail(id);
  // const { data: summary } = useReviewSummary(id);
  const { data: wishlist } = useWishlist();

  const product = dummydata.find((p) => p.id === id);
  const isLoading = !product;
  const summary = dummysummary[parseInt(id.split("_")[1], 10) - 1];

  // Availability check — enabled only when size is selected
  const availabilityEnabled = !!selectedSize && !!startDate;
  const { data: availability, isFetching: checkingAvail } = useAvailability(
    id,
    { size: selectedSize, startDate, rentalDays },
    availabilityEnabled,
  );

  const { mutate: addToCart, isPending: addingToCart } = useAddToCart();
  const { mutate: toggleWishlist } = useToggleWishlist();

  const inWishlist = wishlist?.some((w) => w.product.id === id) ?? false;

  const handleAddToCart = () => {
    // if (!isAuthenticated) {
    //   router.push("/login");
    //   return;
    // }
    if (!selectedSize) {
      toast({ title: "Select a size first", variant: "destructive" });
      return;
    }
    if (!availability?.available) {
      toast({
        title: "Not available on selected dates",
        variant: "destructive",
      });
      return;
    }
    console.log(startDate);
    addToCart(
      { productId: id, size: selectedSize, quantity: 1, startDate, rentalDays },
      { onSuccess: () => toast({ title: "Added to cart!" }) },
    );
  };

  if (isLoading || !product) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      {/* Product images + info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.images[0]}
          alt={product.name}
          className="rounded-lg w-full object-cover h-[500px]"
        />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl font-medium text-green-700">
            Rp {product.pricePerDay.toLocaleString("id-ID")} / day
          </p>
          <StarRating value={product.avgRating} readonly />
          <p className="text-gray-600">{product.description}</p>

          {/* Size selection */}
          <div>
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${selectedSize === size ? "border-green-700 bg-green-50" : ""}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Date + duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">Start Date</p>
              <input
                type="date"
                value={startDate}
                min={format(new Date(), "yyyy-MM-dd")}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <p className="font-medium mb-2">Rental Days</p>
              <input
                type="number"
                value={rentalDays}
                min={1}
                max={30}
                onChange={(e) => setRentalDays(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
          </div>

          {/* Availability badge */}
          {availabilityEnabled && (
            <div
              className={`p-3 rounded text-sm font-medium ${
                checkingAvail
                  ? "bg-gray-100 text-gray-600"
                  : availability?.available
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
              }`}
            >
              {checkingAvail
                ? "Checking availability..."
                : availability?.available
                  ? "Available for selected dates"
                  : "Not available — please choose different dates"}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={addingToCart || !availability?.available}
              className="flex-1 bg-green-700 hover:bg-green-800"
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleWishlist({ productId: id, inWishlist })}
            >
              {inWishlist ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </div>
      </div>

      {/* Review summary section */}
      {summary && <ReviewSummary summary={summary} />}

      {/* Preview of first few reviews */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Reviews ({product.totalReviews})
          </h2>
          <a
            href={`/products/${id}/reviews`}
            className="text-green-700 text-sm underline"
          >
            View all reviews
          </a>
        </div>
        {product.totalReviews === 0 && (
          <p className="text-gray-500 text-sm">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
}
