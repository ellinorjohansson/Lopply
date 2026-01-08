"use client";
import { useEffect, useState } from "react";
import Card from "@/common/components/card/Card";
import { IRace } from "@/models/Race";
import { getPendingRaces, updateRaceStatus } from "@/services/raceService";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import ErrorToaster from "@/common/components/toasters/ErrorToaster";
import { useTranslation } from "@/common/hooks/useTranslation";
import ConfirmModal from "@/common/components/comfirmModal/ConfirmModal";

const PendingRaces = () => {
  const [races, setRaces] = useState<IRace[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approved' | 'rejected' | null>(null);

  const p = useTranslation("pending_races");

  const fetchPendingRaces = async () => {
    try {
      setLoading(true);
      const pendingRaces = await getPendingRaces();
      if (pendingRaces) setRaces(pendingRaces);
    } catch (error) {
      console.error("Failed to fetch pending races:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPendingRaces();
  }, []);

  const handleApprove = (id: string) => {
    setSelectedRaceId(id);
    setActionType('approved');
    setConfirmOpen(true);
  };

  const handleReject = (id: string) => {
    setSelectedRaceId(id);
    setActionType('rejected');
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedRaceId || !actionType) return;

    const success = await updateRaceStatus(selectedRaceId, actionType);

    setConfirmOpen(false);
    setSelectedRaceId(null);
    setActionType(null);

    if (success) {
      setShowSuccessToaster(true);
      fetchPendingRaces();
    } else {
      setErrorMessage(
        actionType === 'approved'
          ? p("approve_error")
          : p("reject_error")
      );
      setShowErrorToaster(true);
    }
  };



  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">{p("loading")}</div>;
  }

  return (
    <>
      <section className="flex flex-col min-h-screen p-4 m-2">
        <div className="flex flex-col gap-1 mb-2">
          <h3 className="text-2xl font-medium mt-13">{p("pending_races")}</h3>
          <span className="text-secondaryaccent text-base">{p("review_submissions")}</span>
        </div>
        {races.length === 0 ? (
          <p className="text-center items-center text-secondaryaccent">{p("no_pending_races")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center">
            {races.map((race) => (
              <Card
                key={race._id}
                id={race._id as string}
                image={race.imageUrl}
                title={race.name}
                location={race.location}
                date={new Date(race.date).toISOString().slice(0, 10)}
                distance={race.distance}
                terrain={race.terrain}
                difficulty={race.difficulty}
                description={race.description || ""}
                raceUrl={race.raceUrl}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </section>
      {showSuccessToaster && (
        <SuccedToaster
          headerMessage={p("success")}
          text={p("action_completed")}
          onClose={() => setShowSuccessToaster(false)}
        />
      )}
      {showErrorToaster && (
        <ErrorToaster
          headerMessage={p("error")}
          text={errorMessage}
          onClose={() => setShowErrorToaster(false)}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title={
          actionType === 'approved'
            ? p("confirm_approve_title")
            : p("confirm_reject_title")
        }
        message={
          actionType === 'approved'
            ? p("confirm_approve_message")
            : p("confirm_reject_message")
        }
        onConfirm={handleConfirmAction}
        onCancel={() => {
          setConfirmOpen(false);
          setSelectedRaceId(null);
          setActionType(null);
        }}
      />

    </>
  );
};

export default PendingRaces;