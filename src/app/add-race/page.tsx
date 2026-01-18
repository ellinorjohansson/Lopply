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
  const buttonsT = useTranslation("buttons");
  const addT = useTranslation("add_race_page");
  const validationT = useTranslation("validation");
  const confirmT = useTranslation("confirm");
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
    const locationRegex = /^[A-ZÀ-Ö][a-zà-öø-ÿ'\-]*(\s[A-ZÀ-Ö][a-zà-öø-ÿ'\-]*)*,\s*[A-ZÀ-Ö][a-zà-öø-ÿ'\-]*(\s[A-ZÀ-Ö][a-zà-öø-ÿ'\-]*)*$/;

    if (!title) newErrors.title = validationT("empty_field");
    if (!locations) {
      newErrors.locations = validationT("empty_field");
    } else if (!locationRegex.test(locations)) {
      newErrors.locations = addT("helper.location_error");
    } if (!distance) newErrors.distance = validationT("empty_field");
    if (!date) newErrors.date = validationT("empty_field");
    if (!categoryDifficulty) newErrors.categoryDifficulty = validationT("empty_field");
    if (!categoryTerrain) newErrors.categoryTerrain = validationT("empty_field");
    if (!imageUrl) newErrors.imageUrl = validationT("empty_field");
    if (!racePageUrl) newErrors.racePageUrl = validationT("empty_field");

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
        setErrorToasterText(result.error || addT("popup.failed_to_add_race"));
        setShowErrorToaster(true);
      }
    } catch (error) {
      console.error(addT("popup.submit_error"), error);
      setErrorToasterText(addT("an_error_occurred_while_submitting_the_form"));
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
      <section className="flex items-center justify-center min-h-screen p-4 mt-10 mb-20 md:m-20">
        <div className="bg-secondary border border-secondaryaccent rounded-3xl p-5 md:p-8 lg:p-15 flex flex-col gap-6 max-w-5xl w-full">
          <div className="flex flex-col gap-1 mb-2">
            <h3 className="text-2xl font-medium">{addT("add_new_race")}</h3>
            <span className="text-secondaryaccent text-base">{addT("submit_a_race")}</span>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <InputField
                label={addT("race_title")}
                size="medium"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={addT("locations")}
                size="medium"
                type="text"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                error={errors.locations}
                helpButton={<HelperButton infoText={addT("helper.location_helper")} />}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={addT("distance")}
                size="medium"
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                error={errors.distance}
                helpButton={<HelperButton infoText={addT("helper.distance_helper")} />}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <InputField
                label={addT("date")}
                size="medium"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                error={errors.date}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <DropdownField
                label={addT("difficulty")}
                value={categoryDifficulty}
                onChange={(e) => setCategoryDifficulty(e.target.value)}
                error={errors.categoryDifficulty}
                options={[
                  { value: "", label: addT("difficulty_options.select_difficulty") },
                  { value: addT("difficulty_options.easy"), label: addT("difficulty_options.easy") },
                  { value: addT("difficulty_options.medium"), label: addT("difficulty_options.medium") },
                  { value: addT("difficulty_options.hard"), label: addT("difficulty_options.hard") },
                ]}
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <DropdownField
                label={addT("terrain")}
                value={categoryTerrain}
                onChange={(e) => setCategoryTerrain(e.target.value)}
                error={errors.categoryTerrain}
                options={[
                  { value: "", label: addT("terrain_options.select_terrain") },
                  { value: addT("terrain_options.urban"), label: addT("terrain_options.urban") },
                  { value: addT("terrain_options.costal"), label: addT("terrain_options.costal") },
                  { value: addT("terrain_options.mountain"), label: addT("terrain_options.mountain") },
                  { value: addT("terrain_options.desert"), label: addT("terrain_options.desert") },
                  { value: addT("terrain_options.forest"), label: addT("terrain_options.forest") },
                ]}
              />
            </div>

            <div className="col-span-2">
              <InputField
                label={addT("image_url")}
                size="large"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                error={errors.imageUrl}
                helpButton={<HelperButton infoText={addT("helper.image_helper")} />}
              />
            </div>

            <div className="col-span-2">
              <TextArea
                label={addT("description")}
                value={description}
                onChange={setDescription}
                helpButton={<HelperButton infoText={addT("helper.description_helper")} />}
              />
            </div>

            <div className="col-span-2">
              <InputField
                label={addT("url_race_page")}
                size="large"
                type="text"
                value={racePageUrl}
                onChange={(e) => setRacePageUrl(e.target.value)}
                error={errors.racePageUrl}
              />
            </div>

            <div className="col-span-2 flex flex-row gap-3 mt-8">
              <PrimaryButton text={buttonsT("add_race")} size="large" />
              <SecondaryButton text={buttonsT("cancel")} size="small" type="button" onClick={handleCancel} />
            </div>
          </form>
          {showToaster && (
            <SuccedToaster
              headerMessage={addT("popup.race_submitted")}
              text={addT("popup.submitted_text")}
              onClose={() => setShowToaster(false)}
            />
          )}
          {showErrorToaster && (
            <ErrorToaster
              headerMessage={addT("popup.error")}
              text={errorToasterText}
              onClose={() => setShowErrorToaster(false)}
            />
          )}
          <span className="text-sm text-secondaryaccent">{validationT("required_field")}</span>
        </div>
      </section>
      <ConfirmModal
        open={cancelPopupOpen}
        title={confirmT("clear_form")}
        message={confirmT("are_you_sure")}
        onConfirm={confirmCancel}
        onCancel={closeCancelPopup}
      />
    </>
  );
};

export default AddRace;
