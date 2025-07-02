
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Database, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { migrateJsonResourcesToSupabase } from '@/utils/migrateResources';

const ResourceMigration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [migrationResult, setMigrationResult] = useState<{ success: number; errors: number } | null>(null);

  const handleMigration = async () => {
    if (!confirm('This will replace all existing resources in the database. Are you sure?')) {
      return;
    }

    setIsLoading(true);
    setMigrationResult(null);

    try {
      const result = await migrateJsonResourcesToSupabase();
      setMigrationResult(result);
      
      if (result.errors === 0) {
        toast.success(`Successfully migrated ${result.success} resources!`);
      } else {
        toast.warning(`Migrated ${result.success} resources with ${result.errors} errors. Check console for details.`);
      }
    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Migration failed. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Resource Migration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Warning:</p>
            <p>This will migrate all resources from the JSON file to the Supabase database and replace any existing resources.</p>
          </div>
        </div>

        {migrationResult && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Migration Results:</h4>
            <p className="text-sm text-blue-800">
              Successfully migrated: <span className="font-medium">{migrationResult.success}</span> resources
            </p>
            {migrationResult.errors > 0 && (
              <p className="text-sm text-red-600">
                Errors: <span className="font-medium">{migrationResult.errors}</span> resources
              </p>
            )}
          </div>
        )}

        <Button
          onClick={handleMigration}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              Migrating Resources...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Migrate JSON Resources to Database
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceMigration;
