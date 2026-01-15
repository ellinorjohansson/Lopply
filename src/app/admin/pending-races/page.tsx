"use client";
import { useEffect, useState, useCallback } from "react";
import Card from "@/common/components/card/Card";
import { IRace } from "@/models/Race";
import { getPendingRaces, updateRaceStatus, deleteRace, getRaces } from "@/services/raceService";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import ErrorToaster from "@/common/components/toasters/ErrorToaster";
import { useTranslation } from "@/common/hooks/useTranslation";
import ConfirmModal from "@/common/components/comfirmModal/ConfirmModal";

interface PendingRacesProps {
  onCountChange?: (_count: number) => void;
}

const PendingRaces = ({ onCountChange }: PendingRacesProps) => {
  const [races, setRaces] = useState<IRace[]>([]);
  const [allRaces, setAllRaces] = useState<IRace[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessToaster, setShowSuccessToaster] = useState(false);
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'approved' | 'rejected' | 'delete' | null>(null);

  const pendingT = useTranslation("pending_races");

  const refetchPending = useCallback(async () => {
    try {
      const pendingRaces = await getPendingRaces();
      setRaces(pendingRaces || []);
      onCountChange?.((pendingRaces || []).length);
    } catch (error) {
      console.error("Failed to refetch pending races:", error);
    }
  }, [onCountChange]);

  const refetchAll = useCallback(async () => {
    try {
      const races = await getRaces();
      setAllRaces(races || []);
    } catch (error) {
      console.error("Failed to refetch all races:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pending, all] = await Promise.all([getPendingRaces(), getRaces()]);
        setRaces(pending || []);
        setAllRaces(all || []);
        onCountChange?.((pending || []).length);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [onCountChange]);

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

  const handleDelete = (id: string) => {
    setSelectedRaceId(id);
    setActionType('delete');
    setConfirmOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedRaceId || !actionType) return;

    let success = false;

    if (actionType === 'delete') {
      success = await deleteRace(selectedRaceId);
    } else {
      success = await updateRaceStatus(selectedRaceId, actionType);
    }

    setConfirmOpen(false);
    setSelectedRaceId(null);

    if (success) {
      setShowSuccessToaster(true);
      refetchPending();
      refetchAll();
    } else {
      setErrorMessage(
        actionType === 'approved'
          ? pendingT("approve_error")
          : actionType === 'rejected'
            ? pendingT("reject_error")
            : pendingT("delete_error")
      );
      setShowErrorToaster(true);
    }

    setActionType(null);
  };



  if (loading) {
    return <span className="flex justify-center items-center min-h-screen text-secondaryaccent">{pendingT("loading")}</span>;
  }

  return (
    <>
      <section className="flex flex-col min-h-screen p-4 m-2">
        <div className="flex flex-col gap-1 mb-2">
          <h3 className="text-2xl font-semibold mt-13">{pendingT("pending_races")}</h3>
          <span className="text-secondaryaccent text-base">{pendingT("review_submissions")}</span>
        </div>
        {races.length === 0 ? (
          <p className="text-center items-center mt-10 text-secondaryaccent">{pendingT("no_pending_races")}</p>
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
        )}<div className="flex flex-col gap-1 mt-8 mb-2">
          <h3 className="text-2xl font-medium mt-16">{pendingT("all_races")}</h3>
        </div>
        {allRaces.length === 0 ? (
          <p className="text-center items-center text-secondaryaccent">{pendingT("no_races")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 justify-items-center mb-10">
            {allRaces.map((race) => (
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
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
      {showSuccessToaster && (
        <SuccedToaster
          headerMessage={pendingT("success")}
          text={pendingT("action_completed")}
          onClose={() => setShowSuccessToaster(false)}
        />
      )}
      {showErrorToaster && (
        <ErrorToaster
          headerMessage={pendingT("error")}
          text={errorMessage}
          onClose={() => setShowErrorToaster(false)}
        />
      )}
      <ConfirmModal
        open={confirmOpen}
        title={
          actionType === 'approved'
            ? pendingT("confirm_approve_title")
            : actionType === 'rejected'
              ? pendingT("confirm_reject_title")
              : pendingT("confirm_delete_title")
        }
        message={
          actionType === 'approved'
            ? pendingT("confirm_approve_message")
            : actionType === 'rejected'
              ? pendingT("confirm_reject_message")
              : pendingT("confirm_delete_message")
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