import Educational from "./components/educationalTemplate/Educational";
import Marketing from "./components/marketingTemplate/Marketing";
import Promotional from "./components/promotionalTemplate/Promotional";
// import EducationalForm from "./components/educationalTemplate/EducationalForm";
// import PromotionalForm from "./components/promotionalTemplate/PromotionalForm";
// import MarketingForm from "./components/marketingTemplate/MarketingForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Educational />
      <Promotional />
      <Marketing />
    </div>
  );
}

export default App;
