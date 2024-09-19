import { useState } from "react";

export default function SkillsSection() {
  const skills = [
    { 
      title: 'Development', 
      skills: ['Python', 'R', 'MATLAB', 'Java', 'JavaScript', 'React', 'Flask', 'Spring Boot', 'jBPM'] 
    },
    { 
      title: 'DataOps', 
      skills: ['SQL Server', 'Kafka', 'S3', 'Airflow', 'Apache Spark', 'Power BI', 'Tableau', 'Apache Superset'] 
    },
    { 
      title: 'MLOps', 
      skills: ['Docker', 'Kubernetes', 'MLflow', 'Jenkins'] 
    },
    { 
      title: 'DevOps', 
      skills: ['CI/CD (Jenkins, GitLab CI)', 'Linux RHEL'] 
    },
    { 
      title: 'Machine Learning Frameworks', 
      skills: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'XGBoost', 'LightGBM', 'H2O', 'Caffe2'] 
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-5">
      {/* Tab navigation */}
      <div className="flex justify-center flex-wrap gap-2 mb-2">
        {skills.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
              activeTab === index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Skill Content */}
      <div className="max-w-4xl mx-auto p-6 border border-muted rounded-lg shadow-md bg-background transition-opacity duration-500 overflow-hidden">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {skills[activeTab].skills.map((skill, index) => (
            <li key={index} className="text-lg">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
