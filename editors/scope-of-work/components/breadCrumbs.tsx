import { Icon } from "@powerhousedao/document-engineering";

type BreadcrumbItem = {
  id: string;
  title: string;
  type: 'root' | 'roadmaps' | 'roadmap' | 'milestone' | 'projects' | 'project' | 'deliverables' | 'deliverable' | 'contributors';
  isActive: boolean;
};

type BreadCrumbsProps = {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (id: string) => void;
};

const BreadCrumbs = ({ breadcrumbs, onBreadcrumbClick }: BreadCrumbsProps) => {
  const getIconForType = (type: BreadcrumbItem['type']) => {
    switch (type) {
      case 'root':
        return 'Globe';
      case 'roadmaps':
      case 'roadmap':
        return 'Compass';
      case 'milestone':
        return 'Compass';
      case 'projects':
      case 'project':
        return 'Project';
      case 'deliverables':
      case 'deliverable':
        return 'CheckCircleFill';
      case 'contributors':
        return 'People';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="mb-4 rounded-md border border-gray-200 p-3 shadow-sm">
      <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.id} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="BaseArrowRight" 
                className="mx-2 h-2 w-2 text-gray-400" 
              />
            )}
            <button
              onClick={() => onBreadcrumbClick(breadcrumb.id)}
              className={`flex items-center space-x-1 rounded-md px-2 py-1 text-sm font-light transition-colors ${
                breadcrumb.isActive
                  ? 'bg-blue-50 text-blue-700 cursor-default'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer'
              }`}
              disabled={breadcrumb.isActive}
            >
              
              <span>{breadcrumb.title}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default BreadCrumbs;
