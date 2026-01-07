"use client";
import PrimaryButton from "@/common/components/buttons/PrimaryButton";
import SecondaryButton from "@/common/components/buttons/SecondaryButton";
import DropdownField from "@/common/components/input/dropdownField/DropdownField";
import HelperButton from "@/common/components/helperButton/HelperButton";
import InputField from "@/common/components/input/inputField/InputField";
import { useTranslation } from "@/common/hooks/useTranslation";
import { useState } from "react";
import TextArea from "@/common/components/input/TextArea";
import ConfirmModal from "@/common/components/comfirmModal/ConfirmModal";
import SuccedToaster from "@/common/components/toasters/SuccedToaster";
import ErrorToaster from "@/common/components/toasters/ErrorToaster";

const AddRace = () => {
  const b = useTranslation("buttons");
  const a = useTranslation("add_race_page");
  const v = useTranslation("validation");
  const c = useTranslation("confirm");
  const [showErrorToaster, setShowErrorToaster] = useState(false);
  const [errorToasterText, setErrorToasterText] = useState("");


  const [categoryTerrain, setCategoryTerrain] = useState("");
  const [showToaster, setShowToaster] = useState(false);

  const [title, setTitle] = useState("");
  const [locations, setLocations] = useState("");
  const [distance, setDistance] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [racePageUrl, setRacePageUrl] = useState("");
  const [categoryDifficulty, setCategoryDifficulty] = useState("");

  const [errors, setErrors] = useState<{
    title?: string;
    locations?: string;
    distance?: string;
    date?: string;
    categoryDifficulty?: string;
    categoryTerrain?: string;
    imageUrl?: string;
    racePageUrl?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!title) newErrors.title = v("empty_field");
    if (!locations) newErrors.locations = v("empty_field");
    if (!distance) newErrors.distance = v("empty_field");
    if (!date) newErrors.date = v("empty_field");
    if (!categoryDifficulty) newErrors.categoryDifficulty = v("empty_field");
    if (!categoryTerrain) newErrors.categoryTerrain = v("empty_field");
    if (!imageUrl) newErrors.imageUrl = v("empty_field");
    if (!racePageUrl) newErrors.racePageUrl = v("empty_field");

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch('/api/races', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          location: locations,
          distance,
          date,
          difficulty: categoryDifficulty,
          terrain: categoryTerrain,
          imageUrl,
          description,
          raceUrl: racePageUrl,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowToaster(true);
        setTitle("");
        setLocations("");
        setDistance("");
        setDate("");
        setCategoryDifficulty("");
        setCategoryTerrain("");
        setImageUrl("");
        setDescription("");
        setRacePageUrl("");
        setErrors({});
      } else {
        setErrorToasterText(result.error || a("popup.failed_to_add_race"));
        setShowErrorToaster(true);
      }
    } catch (error) {
      console.error(a("popup.submit_error"), error);
      setErrorToasterText(a("an_error_occurred_while_submitting_the_form"));
      setShowErrorToaster(true);
    }
  };

  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);

  const handleCancel = () => {
    setCancelPopupOpen(true);
  };

  const confirmCancel = () => {
    setTitle("");
    setLocations("");
    setDistance("");
    setDate("");
    setCategoryDifficulty("");
    setCategoryTerrain("");
    setImageUrl("");
    setDescription("");
    setRacePageUrl("");
    setErrors({});
    setCancelPopupOpen(false);
  };

  const closeCancelPopup = () => {
    setCancelPopupOpen(false);
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen p-4 m-2 md:m-20">
        <div className="bg-secondary border border-secondaryaccent rounded-3xl p-15 flex flex-col gap-6 max-w-5xl w-full">
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-2xl font-medium">{a("add_new_race")}</h3>
            <span className="text-secondaryaccent text-base">{a("submit_a_race")}</span>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={a("race_title")}
                size="medium"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={a("locations")}
                size="medium"
                type="text"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                error={errors.locations}
                helpButton={<HelperButton infoText="" />}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={a("distance")}
                size="medium"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                error={errors.distance}
                helpButton={<HelperButton infoText="" />}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={a("date")}
                size="medium"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={errors.date}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <DropdownField
                label={a("difficulty")}
                value={categoryDifficulty}
                onChange={(e) => setCategoryDifficulty(e.target.value)}
                error={errors.categoryDifficulty}
                options={[
                  { value: a("difficulty_options.easy"), label: a("difficulty_options.easy") },
                  { value: a("difficulty_options.medium"), label: a("difficulty_options.medium") },
                  { value: a("difficulty_options.hard"), label: a("difficulty_options.hard") },
                ]}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <DropdownField
                label={a("terrain")}
                value={categoryTerrain}
                onChange={(e) => setCategoryTerrain(e.target.value)}
                error={errors.categoryTerrain}
                options={[
                  { value: a("terrain_options.urban"), label: a("terrain_options.urban") },
                  { value: a("terrain_options.costal"), label: a("terrain_options.costal") },
                  { value: a("terrain_options.mountain"), label: a("terrain_options.mountain") },
                  { value: a("terrain_options.desert"), label: a("terrain_options.desert") },
                  { value: a("terrain_options.forest"), label: a("terrain_options.forest") },
                ]}
              />
            </div>

            <div className="col-span-2">
              <InputField
                label={a("image_url")}
                size="large"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                error={errors.imageUrl}
                helpButton={<HelperButton infoText="" />}
              />
            </div>

            <div className="col-span-2">
              <TextArea
                label={a("description")}
                value={description}
                onChange={setDescription}
                helpButton={<HelperButton infoText="" />}
              />
            </div>

            <div className="col-span-2">
              <InputField
                label={a("url_race_page")}
                size="large"
                type="text"
                value={racePageUrl}
                onChange={(e) => setRacePageUrl(e.target.value)}
                error={errors.racePageUrl}
              />
            </div>

            <div className="col-span-2 flex flex-row gap-3 mt-8">
              <PrimaryButton text={b("add_race")} size="large" />
              <SecondaryButton text={b("cancel")} size="small" type="button" onClick={handleCancel} />
            </div>
          </form>
          {showToaster && (
            <SuccedToaster
              headerMessage={a("popup.race_submitted")}
              text={a("popup.submitted_text")}
              onClose={() => setShowToaster(false)}
            />
          )}
          {showErrorToaster && (
            <ErrorToaster
              headerMessage={a("popup.error")}
              text={errorToasterText}
              onClose={() => setShowErrorToaster(false)}
            />
          )}
          <span className="text-sm text-secondaryaccent">{v("required_field")}</span>
        </div>
      </section>
      <ConfirmModal
        open={cancelPopupOpen}
        title={c("clear_form")}
        message={c("are_you_sure")}
        onConfirm={confirmCancel}
        onCancel={closeCancelPopup}
      />
    </>
  );
};

export default AddRace;
