
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
  onSuccess?: () => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ jobSeekerId, jobSeekerName, trigger, onSuccess }) => {
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
      
      // Call the success callback to refresh data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Rating error:', error);
      toast({
        title: "Rating Failed",
        description: error.message || "Failed to submit rating. Please try again.",
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
        className="focus:outline-none transition-colors"
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
      <DialogContent className="bg-gray-800 border-gray-600 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Rate {jobSeekerName}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your experience working with this job seeker
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating *
            </label>
            <div className="flex space-x-1">
              {renderStars()}
            </div>
            <p className="text-xs text-gray-400 mt-1">Click on a star to rate</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Comment (optional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience working with this person..."
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitRating}
              disabled={rating === 0 || submitting}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white border-0"
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
