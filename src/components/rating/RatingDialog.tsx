
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { rateJobSeeker } from '@/services/rating';
import { useToast } from '@/hooks/use-toast';

interface RatingDialogProps {
  jobSeekerId: string;
  jobSeekerName: string;
  trigger: React.ReactNode;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ jobSeekerId, jobSeekerName, trigger }) => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmitRating = async () => {
    if (!currentUser || rating === 0) return;

    setSubmitting(true);
    try {
      const ratingData = {
        id: Date.now().toString(),
        raterId: currentUser.uid,
        raterName: currentUser.email || 'Anonymous',
        rating,
        comment,
        createdAt: new Date()
      };

      await rateJobSeeker(jobSeekerId, ratingData);
      
      toast({
        title: "Rating Submitted",
        description: "Your rating has been successfully submitted.",
      });
      
      setOpen(false);
      setRating(0);
      setComment('');
    } catch (error: any) {
      toast({
        title: "Rating Failed",
        description: error.message || "Failed to submit rating.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setRating(index + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`h-6 w-6 ${
            index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
          } transition-colors`}
        />
      </button>
    ));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Rate {jobSeekerName}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your experience working with this job seeker
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating
            </label>
            <div className="flex space-x-1">
              {renderStars()}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Comment (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-700 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={rating === 0 || submitting}
              className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
            >
              {submitting ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
